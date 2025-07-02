
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Scissors, 
  Type, 
  Music,
  Wand2,
  Eraser,
  Eye,
  Download
} from "lucide-react";
import { VideoToolbar } from "./VideoToolbar";
import { VideoTimeline } from "./VideoTimeline";
import { AITools } from "./AITools";
import { useToast } from "@/hooks/use-toast";

interface VideoEditorProps {
  file: File;
}

export const VideoEditor = ({ file }: VideoEditorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([100]);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const tools = [
    { id: 'trim', icon: Scissors, label: 'Trim', color: 'bg-blue-500' },
    { id: 'text', icon: Type, label: 'Text', color: 'bg-green-500' },
    { id: 'music', icon: Music, label: 'Audio', color: 'bg-purple-500' },
    { id: 'ai-bg', icon: Wand2, label: 'AI Background', color: 'bg-pink-500' },
    { id: 'ai-object', icon: Eraser, label: 'Remove Object', color: 'bg-orange-500' },
    { id: 'effects', icon: Eye, label: 'Effects', color: 'bg-indigo-500' },
  ];

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your video is being processed. This may take a few minutes.",
    });
    // Export logic would go here
  };

  return (
    <div className="space-y-6">
      {/* Video Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Video Preview
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{formatTime(currentTime)} / {formatTime(duration)}</Badge>
              <Button onClick={handleExport} className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-auto max-h-96 object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlayPause}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSeek(Math.max(0, currentTime - 10))}
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
                  className="text-white hover:bg-white/20"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
                
                <div className="flex-1">
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={0.1}
                    onValueChange={([value]) => handleSeek(value)}
                    className="cursor-pointer"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-white" />
                  <div className="w-20">
                    <Slider
                      value={volume}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Timeline */}
      <VideoTimeline 
        duration={duration}
        currentTime={currentTime}
        onSeek={handleSeek}
      />

      {/* Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Editing Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
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
              {selectedTool === 'ai-bg' || selectedTool === 'ai-object' ? (
                <AITools tool={selectedTool} />
              ) : (
                <VideoToolbar selectedTool={selectedTool} />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
