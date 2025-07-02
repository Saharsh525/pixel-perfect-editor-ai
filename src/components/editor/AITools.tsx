
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wand2, Eraser, Upload, Download, Eye, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIToolsProps {
  tool: string;
}

export const AITools = ({ tool }: AIToolsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAIProcess = async (toolType: string) => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate AI processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setResult("AI processing completed successfully!");
          toast({
            title: "AI Processing Complete",
            description: `${toolType === 'ai-bg' ? 'Background removal' : 'Object removal'} finished successfully.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const renderBackgroundTool = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Wand2 className="w-5 h-5 text-pink-500" />
        <h3 className="text-lg font-semibold">AI Background Removal</h3>
        <Badge variant="secondary">Beta</Badge>
      </div>
      
      <Alert>
        <Settings className="h-4 w-4" />
        <AlertDescription>
          This tool uses advanced AI to automatically detect and remove backgrounds. 
          Works best with clear subject separation.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Background Action</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">Remove</Button>
                <Button variant="outline" size="sm">Replace</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Edge Refinement</label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm">Soft</Button>
                <Button variant="outline" size="sm">Normal</Button>
                <Button variant="outline" size="sm">Sharp</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Replacement Background</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Upload background image</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <div className="mt-4 space-y-2">
              <Button 
                className="w-full" 
                onClick={() => handleAIProcess('ai-bg')}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Start Background Removal"}
              </Button>
              {result && (
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Result
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderObjectTool = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Eraser className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold">AI Object Removal</h3>
        <Badge variant="secondary">Beta</Badge>
      </div>
      
      <Alert>
        <Settings className="h-4 w-4" />
        <AlertDescription>
          Mark objects you want to remove and our AI will intelligently fill the area 
          using content-aware technology.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <p className="text-sm">Click and drag to mark the object you want to remove</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <p className="text-sm">Adjust the selection area if needed</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <p className="text-sm">Click "Remove Object" to start AI processing</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Brush Size</label>
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" size="sm">S</Button>
                <Button variant="outline" size="sm">M</Button>
                <Button variant="outline" size="sm">L</Button>
                <Button variant="outline" size="sm">XL</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Eraser className="w-4 h-4 mr-2" />
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Canvas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Eraser className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Mark objects to remove</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Button 
                className="w-full" 
                onClick={() => handleAIProcess('ai-object')}
                disabled={isProcessing}
              >
                {isProcessing ? "Removing Object..." : "Remove Object"}
              </Button>
              {result && (
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Result
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (isProcessing) {
    return (
      <div className="space-y-4 text-center py-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
          <Wand2 className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold">AI Processing in Progress</h3>
        <p className="text-muted-foreground">This may take a few minutes...</p>
        <div className="max-w-md mx-auto">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
        </div>
      </div>
    );
  }

  switch (tool) {
    case 'ai-bg':
      return renderBackgroundTool();
    case 'ai-object':
      return renderObjectTool();
    default:
      return (
        <div className="text-center text-muted-foreground py-8">
          AI tool not found
        </div>
      );
  }
};
