
import { useEffect, useRef, forwardRef } from "react";
import { Canvas as FabricCanvas, FabricImage } from "fabric";

interface CanvasProps {
  imageUrl?: string;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({ imageUrl }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    fabricCanvasRef.current = canvas;

    // Load image if provided
    if (imageUrl) {
      FabricImage.fromURL(imageUrl).then((img) => {
        // Scale image to fit canvas
        const scaleX = canvas.width! / img.width!;
        const scaleY = canvas.height! / img.height!;
        const scale = Math.min(scaleX, scaleY);
        
        img.scale(scale);
        img.set({
          left: (canvas.width! - img.width! * scale) / 2,
          top: (canvas.height! - img.height! * scale) / 2,
        });
        
        canvas.add(img);
        canvas.renderAll();
      });
    }

    return () => {
      canvas.dispose();
    };
  }, [imageUrl]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  );
});

Canvas.displayName = "Canvas";
