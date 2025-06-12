'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, BookOpen, MessageCircle, MessageSquare, Sparkles, ChevronDown } from 'lucide-react';

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  language: 'english' | 'hindi';
  highContrast: boolean;
  voiceEnabled: boolean;
  speechRate: number;
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'medium',
    language: 'english',
    highContrast: false,
    voiceEnabled: false,
    speechRate: 0.8
  });
  const pathname = usePathname();

  const getTranslatedText = (englishText: string, hindiText: string) => {
    return settings.language === 'hindi' ? hindiText : englishText;
  };

  const navItems = [
    { 
      href: '/', 
      label: getTranslatedText('Home', 'होम'), 
      icon: Home, 
      description: getTranslatedText('Go to homepage', 'होमपेज पर जाएं') 
    },
    { 
      href: '/tutorials', 
      label: getTranslatedText('Tutorials', 'ट्यूटोरियल'), 
      icon: BookOpen, 
      description: getTranslatedText('Learn with video tutorials', 'वीडियो ट्यूटोरियल से सीखें') 
    },
    { 
      href: '/ai-chat', 
      label: getTranslatedText('AI Chat', 'AI चैट'), 
      icon: MessageCircle, 
      description: getTranslatedText('Chat with DLC Agent', 'DLC एजेंट से चैट करें'), 
      isSpecial: true 
    },
    { 
      href: '/feedback', 
      label: getTranslatedText('Feedback', 'फीडबैक'), 
      icon: MessageSquare, 
      description: getTranslatedText('Share your thoughts', 'अपने विचार साझा करें') 
    },
  ];

  // Listen for accessibility settings changes
  useEffect(() => {
    const handleSettingsChange = (event: CustomEvent) => {
      setSettings(event.detail);
    };

    // Load initial settings
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading accessibility settings:', error);
      }
    }

    window.addEventListener('accessibilitySettingsChanged', handleSettingsChange as EventListener);
    return () => {
      window.removeEventListener('accessibilitySettingsChanged', handleSettingsChange as EventListener);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const isActive = (href: string) => pathname === href;

  const getPageTitle = () => {
    const currentPage = navItems.find(item => item.href === pathname);
    return currentPage ? currentPage.label : getTranslatedText('Digital Learning Course', 'डिजिटल लर्निंग कोर्स');
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 border-b transition-all duration-300 bg-white/95 backdrop-blur-md border-gray-200 shadow-xl ${isScrolled ? 'shadow-2xl' : 'shadow-lg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group" aria-label={getTranslatedText('Digital Learning Course Home', 'डिजिटल लर्निंग कोर्स होम')}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl bg-gradient-to-r from-blue-600 to-purple-600">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    DLC
                  </span>
                  <div className="text-xs -mt-1 text-gray-500">
                    {getTranslatedText('Digital Learning', 'डिजिटल लर्निंग')}
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`relative px-6 py-3 text-lg font-medium transition-all duration-300 flex items-center space-x-2 rounded-2xl group ${
                      isActive(item.href)
                        ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg scale-105'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-105'
                    }`}
                    aria-label={item.description}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.isSpecial && (
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                    )}
                    
                    {/* Hover tooltip */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-gray-900 text-white">
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900"></div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 relative transition-all duration-300 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                size="lg"
                aria-label={isOpen ? getTranslatedText('Close menu', 'मेनू बंद करें') : getTranslatedText('Open menu', 'मेनू खोलें')}
                aria-expanded={isOpen}
              >
                <div className="relative w-7 h-7">
                  <Menu className={`w-7 h-7 absolute transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                  <X className={`w-7 h-7 absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
                </div>
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          <div className={`md:hidden absolute left-0 right-0 top-full transition-all duration-500 ease-in-out transform ${
            isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
          } bg-white/98 backdrop-blur-md shadow-2xl border-t border-gray-100`}>
            <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Current page indicator */}
              <div className="text-center mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="text-sm text-gray-500">
                  {getTranslatedText('Current Page', 'वर्तमान पृष्ठ')}
                </div>
                <div className="text-lg font-semibold text-blue-600">
                  {getPageTitle()}
                </div>
              </div>

              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-6 py-5 text-lg font-medium transition-all duration-300 rounded-2xl group transform hover:scale-[1.02] ${
                    isActive(item.href)
                      ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen ? 'slideInFromTop 0.5s ease-out forwards' : 'none'
                  }}
                  onClick={() => setIsOpen(false)}
                  aria-label={item.description}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive(item.href) 
                        ? 'bg-white/20'
                        : 'bg-blue-100 group-hover:bg-blue-200'
                    }`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-left">{item.label}</div>
                      <div className={`text-sm text-left ${
                        isActive(item.href) 
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.isSpecial && (
                      <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                    )}
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                      isActive(item.href) ? 'rotate-180' : 'rotate-0'
                    }`} />
                  </div>
                </Link>
              ))}

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm mb-4 text-gray-500">
                  {getTranslatedText('Quick Actions', 'त्वरित क्रियाएं')}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 justify-center py-4 transition-all duration-300 hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                  >
                    <span>↑</span>
                    <span>{getTranslatedText('Top', 'टॉप')}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 justify-center py-4 transition-all duration-300 hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => {
                      const footer = document.querySelector('footer');
                      footer?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                  >
                    <span>↓</span>
                    <span>{getTranslatedText('Bottom', 'बॉटम')}</span>
                  </Button>
                </div>
              </div>

              {/* Language & Accessibility Quick Access */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="text-sm mb-3 text-gray-600">
                  {getTranslatedText('Accessibility', 'पहुंच')}
                </div>
                <div className="text-xs text-center opacity-75">
                  {getTranslatedText(
                    'Use the accessibility bar above for font size, language, and contrast options',
                    'फ़ॉन्ट साइज़, भाषा और कंट्रास्ट विकल्पों के लिए ऊपर दिए गए एक्सेसिबिलिटी बार का उपयोग करें'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile menu overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}