
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Plus } from "lucide-react";

interface VideoTimelineProps {
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
}

export const VideoTimeline = ({ duration, currentTime, onSeek }: VideoTimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cuts, setCuts] = useState<number[]>([]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.type !== 'click') return;
    
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const time = percentage * duration;
      onSeek(time);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const time = percentage * duration;
        onSeek(time);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, duration, onSeek]);

  const addCut = () => {
    setCuts([...cuts, currentTime]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const generateTicks = () => {
    const ticks = [];
    const tickCount = Math.floor(duration / 10); // One tick every 10 seconds
    
    for (let i = 0; i <= tickCount; i++) {
      const time = i * 10;
      const position = (time / duration) * 100;
      
      ticks.push(
        <div
          key={i}
          className="absolute flex flex-col items-center"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-px h-3 bg-gray-400" />
          <span className="text-xs text-muted-foreground mt-1">
            {formatTime(time)}
          </span>
        </div>
      );
    }
    
    return ticks;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Timeline</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={addCut}>
              <Scissors className="w-4 h-4 mr-1" />
              Add Cut
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Clip
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Timeline ruler */}
          <div className="relative h-8 bg-gray-100 dark:bg-gray-800 rounded">
            {generateTicks()}
          </div>
          
          {/* Main timeline */}
          <div
            ref={timelineRef}
            className="relative h-12 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {/* Progress indicator */}
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            
            {/* Playhead */}
            <div
              className="absolute top-0 w-1 h-full bg-red-500 z-10"
              style={{ left: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute -top-1 -left-2 w-5 h-3 bg-red-500 rounded-t-sm" />
            </div>
            
            {/* Cut markers */}
            {cuts.map((cutTime, index) => (
              <div
                key={index}
                className="absolute top-0 w-0.5 h-full bg-yellow-500 z-5"
                style={{ left: `${(cutTime / duration) * 100}%` }}
              >
                <div className="absolute -top-2 -left-1.5 w-3 h-3 bg-yellow-500 rounded-full" />
              </div>
            ))}
            
            {/* Timeline content representation */}
            <div className="absolute inset-0 flex items-center px-2">
              <div className="flex-1 h-6 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 rounded-sm flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Video Track
                </span>
              </div>
            </div>
          </div>
          
          {/* Audio tracks */}
          <div className="space-y-2">
            <div className="relative h-8 bg-green-100 dark:bg-green-900 rounded flex items-center px-2">
              <span className="text-xs font-medium text-green-700 dark:text-green-300">
                Audio Track 1
              </span>
            </div>
            <div className="relative h-8 bg-gray-100 dark:bg-gray-800 rounded flex items-center px-2 border-dashed border-2 border-gray-300">
              <span className="text-xs text-muted-foreground">
                + Add Audio Track
              </span>
            </div>
          </div>
        </div>
        
        {cuts.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Cuts ({cuts.length})</h4>
            <div className="flex flex-wrap gap-2">
              {cuts.map((cutTime, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded text-sm"
                >
                  <span>{formatTime(cutTime)}</span>
                  <button
                    onClick={() => setCuts(cuts.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
