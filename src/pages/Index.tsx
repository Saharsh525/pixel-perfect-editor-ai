
import { useState } from "react";
import { Upload, Video, Image as ImageIcon, Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoEditor } from "@/components/editor/VideoEditor";
import { ImageEditor } from "@/components/editor/ImageEditor";
import { FileUpload } from "@/components/upload/FileUpload";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"video" | "image">("video");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const fileType = file.type.startsWith('video/') ? 'video' : 'image';
    setActiveTab(fileType);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for editing`,
    });
  };

  const features = [
    {
      icon: Video,
      title: "Video Editing",
      description: "Trim, cut, merge videos with AI-powered tools",
      items: ["Trim & Cut", "Add Subtitles", "Background Music", "AI Background Removal", "Object Removal"]
    },
    {
      icon: ImageIcon,
      title: "Image Editing",
      description: "Professional image editing with AI enhancement",
      items: ["Crop & Rotate", "Filters & Effects", "Background Removal", "Object Removal", "Smart Enhancement"]
    },
    {
      icon: Wand2,
      title: "AI Tools",
      description: "Powered by advanced AI models",
      items: ["Smart Background Removal", "Content-Aware Fill", "Face Detection", "Object Tracking", "Auto Enhancement"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Video & Image Editor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional video and image editing powered by artificial intelligence. 
            Create stunning content with cutting-edge AI tools.
          </p>
        </div>

        {!uploadedFile ? (
          <>
            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upload Section */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Get Started</CardTitle>
                <CardDescription>
                  Upload a video or image file to begin editing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onFileUpload={handleFileUpload} />
              </CardContent>
            </Card>
          </>
        ) : (
          /* Editor Interface */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Editing: {uploadedFile.name}</h2>
              <Button 
                variant="outline" 
                onClick={() => setUploadedFile(null)}
              >
                Upload New File
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "video" | "image")}>
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="video" disabled={!uploadedFile?.type.startsWith('video/')}>
                  <Video className="w-4 h-4 mr-2" />
                  Video Editor
                </TabsTrigger>
                <TabsTrigger value="image" disabled={!uploadedFile?.type.startsWith('image/')}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image Editor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="mt-6">
                <VideoEditor file={uploadedFile} />
              </TabsContent>

              <TabsContent value="image" className="mt-6">
                <ImageEditor file={uploadedFile} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
