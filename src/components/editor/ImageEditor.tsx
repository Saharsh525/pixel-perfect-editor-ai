
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  RotateCw, 
  Crop, 
  Palette, 
  Wand2, 
  Eraser,
  Download,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { Canvas } from "@/components/canvas/Canvas";
import { ImageFilters } from "./ImageFilters";
import { AITools } from "./AITools";
import { useToast } from "@/hooks/use-toast";

interface ImageEditorProps {
  file: File;
}

export const ImageEditor = ({ file }: ImageEditorProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const [zoom, setZoom] = useState([100]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const tools = [
    { id: 'crop', icon: Crop, label: 'Crop', color: 'bg-blue-500' },
    { id: 'rotate', icon: RotateCw, label: 'Rotate', color: 'bg-green-500' },
    { id: 'filters', icon: Palette, label: 'Filters', color: 'bg-purple-500' },
    { id: 'ai-bg', icon: Wand2, label: 'AI Background', color: 'bg-pink-500' },
    { id: 'ai-object', icon: Eraser, label: 'Remove Object', color: 'bg-orange-500' },
  ];

  const handleExport = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `edited-${file.name}`;
      link.href = canvasRef.current.toDataURL();
      link.click();
      
      toast({
        title: "Image Exported",
        description: "Your edited image has been downloaded.",
      });
    }
  };

  const applyFilters = () => {
    const filters = [
      `brightness(${brightness[0]}%)`,
      `contrast(${contrast[0]}%)`,
      `saturate(${saturation[0]}%)`
    ].join(' ');
    
    return { filter: filters };
  };

  return (
    <div className="space-y-6">
      {/* Image Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Image Preview
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Redo className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-1">
                <Button variant="outline" size="sm" onClick={() => setZoom([Math.max(25, zoom[0] - 25)])}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium w-12 text-center">{zoom[0]}%</span>
                <Button variant="outline" size="sm" onClick={() => setZoom([Math.min(200, zoom[0] + 25)])}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={handleExport} className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden min-h-96 flex items-center justify-center">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                style={{
                  ...applyFilters(),
                  transform: `scale(${zoom[0] / 100})`,
                  maxWidth: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain'
                }}
                className="transition-all duration-200"
              />
            )}
            
            {/* Canvas for drawing/editing */}
            {selectedTool === 'crop' && (
              <Canvas imageUrl={imageUrl} ref={canvasRef} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Basic Adjustments */}
      <Card>
        <CardHeader>
          <CardTitle>Adjustments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Brightness</label>
              <Slider
                value={brightness}
                onValueChange={setBrightness}
                min={0}
                max={200}
                step={1}
                className="cursor-pointer"
              />
              <div className="text-xs text-muted-foreground text-center">{brightness[0]}%</div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Contrast</label>
              <Slider
                value={contrast}
                onValueChange={setContrast}
                min={0}
                max={200}
                step={1}
                className="cursor-pointer"
              />
              <div className="text-xs text-muted-foreground text-center">{contrast[0]}%</div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Saturation</label>
              <Slider
                value={saturation}
                onValueChange={setSaturation}
                min={0}
                max={200}
                step={1}
                className="cursor-pointer"
              />
              <div className="text-xs text-muted-foreground text-center">{saturation[0]}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Editing Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant={selectedTool === tool.id ? "default" : "outline"}
                className="flex flex-col items-center space-y-2 h-auto py-4"
                onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tool.color}`}>
                  <tool.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs">{tool.label}</span>
              </Button>
            ))}
          </div>

          {/* Tool-specific content */}
          {selectedTool && (
            <div className="border-t pt-6">
              {selectedTool === 'filters' && <ImageFilters />}
              {(selectedTool === 'ai-bg' || selectedTool === 'ai-object') && (
                <AITools tool={selectedTool} />
              )}
              {selectedTool === 'crop' && (
                <div className="text-center text-muted-foreground">
                  Click and drag on the image above to crop
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
