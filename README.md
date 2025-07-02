
# AI Video & Image Editor

A modern, AI-powered video and image editing application built with React, TypeScript, and cutting-edge AI technologies. Create professional content with intelligent tools for background removal, object removal, and advanced editing features.

## ✨ Features

### 🎥 Video Editing
- **Basic Tools**: Trim, cut, merge videos with precision
- **Text Overlays**: Add customizable subtitles and text with various fonts and styles  
- **Audio Integration**: Add background music and audio tracks
- **Timeline Editor**: Professional timeline with multi-track support
- **AI Background Removal**: Automatically remove or replace video backgrounds
- **AI Object Removal**: Content-aware object removal from video frames
- **Export Options**: Multiple quality settings (720p, 1080p, 4K)

### 🖼️ Image Editing  
- **Basic Adjustments**: Crop, rotate, zoom with precision controls
- **Filters & Effects**: 12+ professional filters plus advanced options
- **AI Enhancement**: Smart image enhancement and HDR processing
- **Background Removal**: AI-powered background detection and removal
- **Object Removal**: Intelligent object removal with content-aware fill
- **Canvas Editing**: Draw shapes, arrows, and annotations
- **Export Formats**: PNG, JPEG with quality settings

### 🧠 AI-Powered Tools
- **Smart Background Removal**: Advanced AI models for precise edge detection
- **Content-Aware Fill**: Intelligently fill removed areas
- **Face Detection**: Automatic face detection and tracking
- **Object Tracking**: Track and apply effects to moving objects
- **Auto Enhancement**: One-click AI image optimization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern browser with WebGL support

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-video-image-editor.git
cd ai-video-image-editor

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components

### Media Processing
- **fabric.js** - Canvas-based image editing
- **react-dropzone** - File upload with drag & drop
- **@huggingface/transformers** - In-browser AI models

### State Management
- **React Context** - For global state management
- **React Hooks** - For local component state

### AI & ML
- **Hugging Face Transformers** - Pre-trained AI models
- **MediaPipe** - Computer vision tasks (planned)
- **OpenCV.js** - Image processing (planned)

## 📖 Usage Guide

### Getting Started

1. **Upload Media**: Drag and drop video or image files, or click to browse
2. **Choose Editor**: Automatically switches between video and image editor
3. **Select Tools**: Choose from basic editing or AI-powered tools
4. **Edit & Preview**: Make adjustments and preview in real-time
5. **Export**: Download your edited content

### Video Editing Workflow

1. **Import Video**: Upload MP4, AVI, MOV, MKV, or WebM files
2. **Timeline Editing**: 
   - Use the timeline to trim and cut clips
   - Add multiple audio tracks
   - Set cut points with precision
3. **Add Text**: Create subtitles and text overlays with custom fonts
4. **AI Tools**: Remove backgrounds or objects using AI
5. **Export**: Choose quality and download

### Image Editing Workflow

1. **Import Image**: Upload PNG, JPG, JPEG, GIF, BMP, or WebP files
2. **Basic Adjustments**: Adjust brightness, contrast, and saturation
3. **Apply Filters**: Choose from 12+ professional filters
4. **AI Enhancement**: Use AI tools for background/object removal
5. **Canvas Editing**: Draw and annotate directly on the image
6. **Export**: Save in preferred format and quality

## 🔧 Configuration

### Supported File Formats

**Video**: MP4, AVI, MOV, MKV, WebM (max 500MB)
**Image**: PNG, JPG, JPEG, GIF, BMP, WebP (max 500MB)

### AI Model Configuration

The application uses Hugging Face Transformers for AI processing:

```typescript
// Configure AI models
env.allowLocalModels = false;
env.useBrowserCache = false;
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── editor/          # Video and image editors
│   ├── upload/          # File upload components  
│   ├── canvas/          # Canvas-based editing
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Application pages
└── types/               # TypeScript type definitions
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for AI models
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Fabric.js](http://fabricjs.com/) for canvas editing

## 📬 Support

- 📧 Email: support@ai-video-editor.com
- 💬 Discord: [Join our community](https://discord.gg/ai-editor)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/ai-video-image-editor/issues)

---

**Made with ❤️ by the AI Video Editor Team**
