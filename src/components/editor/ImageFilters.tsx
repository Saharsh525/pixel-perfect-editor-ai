
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ImageFilters = () => {
  const filters = [
    { name: "Original", preview: "bg-gray-200", class: "filter-none" },
    { name: "Vintage", preview: "bg-amber-200", class: "sepia-[0.5] contrast-[1.2]" },
    { name: "Black & White", preview: "bg-gray-400", class: "grayscale" },
    { name: "Cool", preview: "bg-blue-200", class: "hue-rotate-[180deg]" },
    { name: "Warm", preview: "bg-orange-200", class: "hue-rotate-[30deg] saturate-[1.2]" },
    { name: "High Contrast", preview: "bg-slate-600", class: "contrast-[1.5]" },
    { name: "Soft", preview: "bg-pink-200", class: "blur-[0.5px] brightness-[1.1]" },
    { name: "Dramatic", preview: "bg-purple-900", class: "contrast-[1.8] saturate-[0.8]" },
    { name: "Sunny", preview: "bg-yellow-200", class: "brightness-[1.3] saturate-[1.4]" },
    { name: "Moody", preview: "bg-indigo-900", class: "brightness-[0.8] contrast-[1.3] hue-rotate-[220deg]" },
    { name: "Film", preview: "bg-green-200", class: "sepia-[0.3] contrast-[1.1] brightness-[1.1]" },
    { name: "Fade", preview: "bg-gray-300", class: "brightness-[1.2] contrast-[0.8] saturate-[0.9]" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Photo Filters</h3>
        <Badge variant="secondary">12 Filters</Badge>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filters.map((filter, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex flex-col items-center space-y-2 h-auto py-4 hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-lg ${filter.preview} border-2 border-gray-200`} />
            <span className="text-xs font-medium">{filter.name}</span>
          </Button>
        ))}
      </div>
      
      <div className="pt-4 border-t">
        <h4 className="text-sm font-medium mb-3">Advanced Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2" />
              <p className="text-sm font-medium">AI Enhance</p>
              <p className="text-xs text-muted-foreground">Smart enhancement</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-2" />
              <p className="text-sm font-medium">HDR</p>
              <p className="text-xs text-muted-foreground">High dynamic range</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-2" />
              <p className="text-sm font-medium">Portrait</p>
              <p className="text-xs text-muted-foreground">Skin smoothing</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
