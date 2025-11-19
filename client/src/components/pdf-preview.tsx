import { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import PdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url'; // Changed to .mjs

pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorkerUrl;

export function PdfPreview({ filePath }: { filePath: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderPdf = async () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('Canvas element not found.');
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        console.error('Canvas context not available.');
        return;
      }
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'gray';
      context.font = '20px Arial';
      context.textAlign = 'center';
      context.fillText('Loading Preview...', canvas.width / 2, canvas.height / 2);

      try {
        const loadingTask = pdfjsLib.getDocument(filePath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.0 });
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        
        await page.render(renderContext).promise;

      } catch (error: any) {
        console.error(`[PDF-DEBUG] Error rendering PDF for ${filePath}:`, error);
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'red';
        context.font = '16px Arial';
        context.textAlign = 'left';
        context.fillText('Error:', 10, 30);
        context.fillText(error.message, 10, 50);
        context.fillText('Check console for details.', 10, 80);
      }
    };

    renderPdf();
  }, [filePath]);

  return <canvas ref={canvasRef} width="400" height="565" className="w-full h-full object-cover" />;
}