
import { useEffect, useRef, forwardRef } from "react";
import { Canvas as FabricCanvas, Circle, Rect } from "fabric";

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
      const img = new Image();
      img.onload = () => {
        canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width! / img.width,
          scaleY: canvas.height! / img.height
        });
      };
      img.src = imageUrl;
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
