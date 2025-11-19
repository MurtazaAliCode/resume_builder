import { getDocument } from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react';

import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export function PdfPreview({ filePath }: { filePath: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderPdf = async () => {
      setLoading(true);
      setError(null);
      try {
        const loadingTask = getDocument(filePath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = canvasRef.current;
        if (!canvas) {
          setError("Canvas not found");
          setLoading(false);
          return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
          setError("Could not get canvas context");
          setLoading(false);
          return;
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
      } catch (err: any) {
        console.error('Error rendering PDF:', err);
        setError(`Failed to load PDF. ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (filePath) {
      renderPdf();
    } else {
      setError("No file path provided.");
      setLoading(false);
    }
  }, [filePath]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      {loading && <p className="text-gray-500">Loading preview...</p>}
      {error && <p className="text-red-500 p-4 text-center">{error}</p>}
      <canvas ref={canvasRef} className={`w-full h-full ${loading || error ? 'hidden' : ''}`} />
    </div>
  );
}
