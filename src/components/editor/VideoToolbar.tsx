
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, Upload, Type, Palette } from "lucide-react";

interface VideoToolbarProps {
  selectedTool: string;
}

export const VideoToolbar = ({ selectedTool }: VideoToolbarProps) => {
  const [trimStart, setTrimStart] = useState([0]);
  const [trimEnd, setTrimEnd] = useState([100]);
  const [textContent, setTextContent] = useState("");
  const [fontSize, setFontSize] = useState([24]);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const renderTrimTool = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Trim Video</h3>
        <Badge variant="secondary">00:00 - 01:30</Badge>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Start Time</Label>
          <Slider
            value={trimStart}
            onValueChange={setTrimStart}
            max={100}
            step={1}
            className="cursor-pointer"
          />
          <div className="text-sm text-muted-foreground">
            {Math.floor(trimStart[0] * 0.9)} seconds
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>End Time</Label>
          <Slider
            value={trimEnd}
            onValueChange={setTrimEnd}
            max={100}
            step={1}
            className="cursor-pointer"
          />
          <div className="text-sm text-muted-foreground">
            {Math.floor(trimEnd[0] * 0.9)} seconds
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button className="flex-1">
            <Play className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="720p">720p</SelectItem>
              <SelectItem value="1080p">1080p</SelectItem>
              <SelectItem value="4k">4K</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderTextTool = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Type className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Add Text Overlay</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text-content">Text Content</Label>
            <Textarea
              id="text-content"
              placeholder="Enter your text here..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={12}
              max={72}
              step={1}
              className="cursor-pointer"
            />
            <div className="text-sm text-muted-foreground">{fontSize[0]}px</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Font Style</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arial">Arial</SelectItem>
                <SelectItem value="helvetica">Helvetica</SelectItem>
                <SelectItem value="times">Times New Roman</SelectItem>
                <SelectItem value="courier">Courier</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Position</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Text position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="bottom">Bottom</SelectItem>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
              <Palette className="w-4 h-4 mr-2" />
              Text Color
            </Button>
            <Button variant="outline" className="w-full">
              Background
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button className="flex-1">Add Text</Button>
        <Button variant="outline">Preview</Button>
      </div>
    </div>
  );

  const renderAudioTool = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Add Background Music</h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600 mb-2">Upload an audio file</p>
        <Input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
          className="max-w-xs mx-auto"
        />
      </div>
      
      {audioFile && (
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{audioFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <Button variant="outline">
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-2">
        <Label>Audio Volume</Label>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          className="cursor-pointer"
        />
      </div>
      
      <Button className="w-full">Add Audio Track</Button>
    </div>
  );

  switch (selectedTool) {
    case 'trim':
      return renderTrimTool();
    case 'text':
      return renderTextTool();
    case 'music':
      return renderAudioTool();
    default:
      return (
        <div className="text-center text-muted-foreground py-8">
          Select a tool to get started
        </div>
      );
  }
};
