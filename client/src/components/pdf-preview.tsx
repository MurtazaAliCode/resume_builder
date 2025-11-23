import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import PdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorkerUrl;

export function PdfPreview({ filePath }: { filePath: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const renderPdf = async () => {
      setIsLoading(true); // Start loading
      const canvas = canvasRef.current;
      if (!canvas) {
        // Log an error if canvas ref is not available
        console.error('[PDF-PREVIEW] Canvas ref is null');
        setIsLoading(false); // Stop loading if canvas not available
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        // Log an error if canvas context is not available
        console.error('[PDF-PREVIEW] Canvas context is null');
        setIsLoading(false); // Stop loading if context not available
        return;
      }

      // Clear any previous content or error message before rendering
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Optional: Show a temporary loading message on canvas too, though HTML overlay is primary
      context.fillStyle = 'gray';
      context.font = '16px Arial';
      context.fillText('Loading PDF...', 10, 30);


      try {
        const loadingTask = pdfjsLib.getDocument(filePath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 }); // Increased scale for better quality

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        
        await page.render(renderContext as any).promise;
        setIsLoading(false); // Stop loading on successful render

      } catch (error: any) {
        console.error(`[PDF-DEBUG] Error rendering PDF for ${filePath}:`, error);
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous content
        context.fillStyle = 'red';
        context.font = '16px Arial';
        context.fillText('Preview failed to load.', 10, 30);
        setIsLoading(false); // Stop loading on error
      }
    };

    if (filePath) {
      renderPdf();
    } else {
        // If no filePath, stop loading and clear canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        setIsLoading(false);
    }
  }, [filePath]);

  return (
    <div className="relative w-full h-full min-h-[200px] flex items-center justify-center bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-gray-700 text-lg font-medium">
          Loading...
        </div>
      )}
      {/* Canvas is invisible when loading to show the HTML loading overlay */}
      <canvas ref={canvasRef} className={`w-full h-auto ${isLoading ? 'invisible' : ''}`}></canvas>
    </div>
  );
}
