# Digital Literacy Course (DLC) Website

A comprehensive, accessible, and multilingual platform designed to empower parents and elderly users in learning digital tools with confidence.

## 🌟 Features

### 🎯 Core Functionality
- **Interactive AI Chat Assistant** - 24/7 DLC Agent for personalized help
- **Comprehensive Tutorial Library** - Step-by-step guides for popular apps
- **Feedback System** - Community-driven improvement platform
- **Accessibility-First Design** - Built for seniors and elderly users

### ♿ Accessibility Features
- **Font Size Control** - Small, Medium, Large options
- **High Contrast Mode** - Enhanced visibility for better readability
- **Voice Input/Output** - Speech recognition and text-to-speech
- **Multilingual Support** - English and Hindi language switching
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Compatible** - Proper ARIA labels and semantic HTML

### 📱 Responsive Design
- **Mobile-First Approach** - Optimized for all screen sizes
- **Touch-Friendly Interface** - Large buttons and touch targets
- **Progressive Enhancement** - Works on all devices and browsers

## 🚀 Technology Stack

- **Framework**: Next.js 13.5.1 with TypeScript
- **Styling**: Tailwind CSS with custom accessibility enhancements
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)
- **Build Tool**: Next.js with static export
- **Deployment**: Static site generation ready

## 📁 Project Structure

```
digital-literacy-course/
├── app/                          # Next.js app directory
│   ├── ai-chat/                 # AI Chat page
│   ├── feedback/                # Feedback form page
│   ├── tutorials/               # Tutorials listing page
│   ├── globals.css              # Global styles and accessibility
│   ├── layout.tsx               # Root layout with navigation
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── AccessibilityBar.tsx     # Global accessibility controls
│   └── Navigation.tsx           # Main navigation component
├── lib/                         # Utility functions
│   └── utils.ts                 # Tailwind class utilities
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-literacy-course
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Static Export (for hosting)

```bash
# Generate static files
npm run build

# Files will be in the 'out' directory
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Secondary**: Green (#10B981)
- **Accent**: Orange (#F59E0B)
- **Warning**: Yellow (#EAB308)
- **Error**: Red (#EF4444)
- **High Contrast**: Black (#000000) and White (#FFFFFF)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Sizes**: Responsive scaling (14px - 20px base)
- **Line Heights**: 150% for body text, 120% for headings
- **Font Weights**: Regular (400), Medium (500), Bold (700)

### Spacing System
- **Base Unit**: 8px
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

## 🌐 Multilingual Support

### Supported Languages
- **English** (Primary)
- **Hindi** (हिंदी)

### Implementation
- Dynamic text switching without page reload
- Persistent language preference
- Context-aware translations
- RTL support ready (for future languages)

## ♿ Accessibility Compliance

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **Text Scaling**: Up to 200% without horizontal scrolling

### Accessibility Features
- **Font Size Control**: 3 size options with responsive scaling
- **High Contrast Mode**: Complete color scheme override
- **Voice Controls**: Speech recognition and synthesis
- **Keyboard Shortcuts**: Standard navigation patterns
- **Error Handling**: Clear error messages and recovery

## 📱 Browser Support

### Supported Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: Android 8+

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced features with JavaScript enabled
- Graceful degradation for older browsers

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization Options

#### Accessibility Settings
```typescript
interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  language: 'english' | 'hindi';
  highContrast: boolean;
  voiceEnabled: boolean;
  speechRate: number;
}
```

#### Theme Customization
Modify `tailwind.config.ts` for custom colors and spacing.

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works on all screen sizes
- [ ] Accessibility features function properly
- [ ] Language switching works throughout the site
- [ ] High contrast mode applies globally
- [ ] Voice features work (where supported)
- [ ] Forms submit and validate correctly
- [ ] Mobile menu functions properly

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators are visible
- [ ] Text scales properly

## 🚀 Deployment

### Static Hosting (Recommended)
1. Run `npm run build`
2. Upload the `out` directory to your hosting provider
3. Configure your server to serve `index.html` for all routes

### Supported Platforms
- **Netlify**: Drag and drop the `out` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Upload to `gh-pages` branch
- **AWS S3**: Upload static files with CloudFront
- **Any static hosting provider**

### Performance Optimization
- Images are optimized and served from CDN (Pexels)
- CSS is minified and purged
- JavaScript is bundled and optimized
- Fonts are preloaded for better performance

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Maintain accessibility standards
3. Test on multiple devices and browsers
4. Update documentation for new features
5. Ensure multilingual support for new content

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write descriptive commit messages

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🆘 Support

### Getting Help
- Check the documentation first
- Search existing issues
- Create a new issue with detailed information
- Include browser and device information

### Contact Information
- **Project Maintainer**: [Your Name]
- **Email**: [your.email@example.com]
- **Website**: [project-website.com]

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Complete accessibility implementation
- Multilingual support (English/Hindi)
- AI chat assistant
- Tutorial library
- Feedback system
- Mobile-responsive design

### Planned Features
- [ ] More language support
- [ ] Video tutorial integration
- [ ] Progress tracking
- [ ] Community features
- [ ] Offline support
- [ ] Mobile app

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icons
- **Pexels** for the high-quality stock images
- **Next.js** team for the amazing framework
- **Accessibility community** for guidance and best practices

---

**Built with ❤️ for digital inclusion and accessibility**#   D L C - P l a t f o r m  
 