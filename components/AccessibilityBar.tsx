'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Type, Mic, Languages, Contrast, Volume2, VolumeX, MicOff } from 'lucide-react';

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  language: 'english' | 'hindi';
  highContrast: boolean;
  voiceEnabled: boolean;
  speechRate: number;
}

interface AccessibilityBarProps {
  onSettingsChange?: (settings: AccessibilitySettings) => void;
}

export default function AccessibilityBar({ onSettingsChange }: AccessibilityBarProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'medium',
    language: 'english',
    highContrast: false,
    voiceEnabled: false,
    speechRate: 0.8
  });

  const [isListening, setIsListening] = useState(false);
  // Add SpeechRecognition type for TypeScript
  type SpeechRecognitionType = typeof window extends { webkitSpeechRecognition: infer T }
    ? T extends abstract new (...args: any) => any
      ? InstanceType<T>
      : any
    : any;
  
    const [recognition, setRecognition] = useState<SpeechRecognitionType | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionCtor =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (!SpeechRecognitionCtor) {
        setRecognition(null);
        return;
      }
      const recognitionInstance = new SpeechRecognitionCtor();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = settings.language === 'hindi' ? 'hi-IN' : 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        speak('Sorry, I could not understand that command.');
      };

      setRecognition(recognitionInstance);
    }
  }, [settings.language]);

  // Apply accessibility settings globally
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Apply font size globally
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '20px'
    };
    root.style.fontSize = fontSizeMap[settings.fontSize];

    // Apply high contrast globally
    if (settings.highContrast) {
      root.classList.add('high-contrast');
      body.classList.add('high-contrast');
      
      // Apply high contrast CSS variables
      root.style.setProperty('--background', '0 0% 0%');
      root.style.setProperty('--foreground', '0 0% 100%');
      root.style.setProperty('--card', '0 0% 10%');
      root.style.setProperty('--card-foreground', '0 0% 100%');
      root.style.setProperty('--border', '0 0% 30%');
      root.style.setProperty('--input', '0 0% 20%');
      root.style.setProperty('--primary', '0 0% 100%');
      root.style.setProperty('--primary-foreground', '0 0% 0%');
      root.style.setProperty('--secondary', '0 0% 20%');
      root.style.setProperty('--secondary-foreground', '0 0% 100%');
      root.style.setProperty('--muted', '0 0% 15%');
      root.style.setProperty('--muted-foreground', '0 0% 70%');
      
      // Override specific colors for better contrast
      body.style.backgroundColor = '#000000';
      body.style.color = '#ffffff';
    } else {
      root.classList.remove('high-contrast');
      body.classList.remove('high-contrast');
      
      // Reset to default CSS variables
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '0 0% 3.9%');
      root.style.setProperty('--card', '0 0% 100%');
      root.style.setProperty('--card-foreground', '0 0% 3.9%');
      root.style.setProperty('--border', '0 0% 89.8%');
      root.style.setProperty('--input', '0 0% 89.8%');
      root.style.setProperty('--primary', '0 0% 9%');
      root.style.setProperty('--primary-foreground', '0 0% 98%');
      root.style.setProperty('--secondary', '0 0% 96.1%');
      root.style.setProperty('--secondary-foreground', '0 0% 9%');
      root.style.setProperty('--muted', '0 0% 96.1%');
      root.style.setProperty('--muted-foreground', '0 0% 45.1%');
      
      // Reset body styles
      body.style.backgroundColor = '';
      body.style.color = '';
    }

    // Save settings to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    
    // Notify parent component of settings change
    if (onSettingsChange) {
      onSettingsChange(settings);
    }

    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('accessibilitySettingsChanged', { 
      detail: settings 
    }));
  }, [settings, onSettingsChange]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading accessibility settings:', error);
      }
    }
  }, []);

  const speak = (text: string) => {
    if ('speechSynthesis' in window && settings.voiceEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = settings.speechRate;
      utterance.pitch = 1;
      utterance.lang = settings.language === 'hindi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const commands = {
      'increase font size': () => {
        const sizes: AccessibilitySettings['fontSize'][] = ['small', 'medium', 'large'];
        const currentIndex = sizes.indexOf(settings.fontSize);
        if (currentIndex < sizes.length - 1) {
          updateSettings({ fontSize: sizes[currentIndex + 1] });
          speak(`Font size changed to ${sizes[currentIndex + 1]}`);
        } else {
          speak('Font size is already at maximum');
        }
      },
      'decrease font size': () => {
        const sizes: AccessibilitySettings['fontSize'][] = ['small', 'medium', 'large'];
        const currentIndex = sizes.indexOf(settings.fontSize);
        if (currentIndex > 0) {
          updateSettings({ fontSize: sizes[currentIndex - 1] });
          speak(`Font size changed to ${sizes[currentIndex - 1]}`);
        } else {
          speak('Font size is already at minimum');
        }
      },
      'toggle contrast': () => {
        updateSettings({ highContrast: !settings.highContrast });
        speak(`High contrast ${!settings.highContrast ? 'enabled' : 'disabled'}`);
      },
      'change language': () => {
        const newLang = settings.language === 'english' ? 'hindi' : 'english';
        updateSettings({ language: newLang });
        speak(`Language changed to ${newLang}`);
      },
      'go to home': () => {
        window.location.href = '/';
        speak('Navigating to home page');
      },
      'go to tutorials': () => {
        window.location.href = '/tutorials';
        speak('Navigating to tutorials page');
      },
      'go to chat': () => {
        window.location.href = '/ai-chat';
        speak('Navigating to AI chat page');
      },
      'go to feedback': () => {
        window.location.href = '/feedback';
        speak('Navigating to feedback page');
      }
    };

    const matchedCommand = Object.keys(commands).find(cmd => 
      command.includes(cmd.toLowerCase())
    );

    if (matchedCommand) {
      commands[matchedCommand as keyof typeof commands]();
    } else {
      speak('Command not recognized. Try saying increase font size, toggle contrast, or go to home.');
    }
  };

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleVoiceRecognition = () => {
    if (!recognition) {
      speak('Voice recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      speak('Voice recognition stopped');
    } else {
      recognition.start();
      setIsListening(true);
      speak('Voice recognition started. Say a command.');
    }
  };

  const toggleVoiceOutput = () => {
    const newVoiceEnabled = !settings.voiceEnabled;
    updateSettings({ voiceEnabled: newVoiceEnabled });
    
    if (newVoiceEnabled) {
      speak('Voice output enabled');
    } else {
      window.speechSynthesis.cancel();
    }
  };

  const getTranslatedText = (englishText: string, hindiText: string) => {
    return settings.language === 'hindi' ? hindiText : englishText;
  };

  return (
    <div className={`border-b transition-all duration-300 ${
      settings.highContrast 
        ? 'bg-black border-white text-white' 
        : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          {/* Font Size Controls */}
          <div className={`flex items-center space-x-3 px-4 py-2 rounded-full shadow-sm ${
            settings.highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-white/80 backdrop-blur-sm'
          }`}>
            <Type className={`w-5 h-5 ${settings.highContrast ? 'text-white' : 'text-blue-600'}`} />
            <span className={`font-medium ${settings.highContrast ? 'text-white' : 'text-blue-900'}`}>
              {getTranslatedText('Font Size:', 'फ़ॉन्ट साइज़:')}
            </span>
            <div className="flex space-x-1">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <Button
                  key={size}
                  variant={settings.fontSize === size ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    updateSettings({ fontSize: size });
                    speak(`Font size changed to ${size}`);
                  }}
                  className={`text-xs px-3 py-1 transition-all duration-200 ${
                    settings.fontSize === size 
                      ? settings.highContrast 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                      : settings.highContrast
                        ? 'border-gray-400 text-white hover:bg-gray-700'
                        : 'hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Voice Controls */}
          <div className="flex space-x-2">
            <Button
              variant={settings.voiceEnabled ? 'default' : 'outline'}
              size="sm"
              onClick={toggleVoiceOutput}
              className={`flex items-center space-x-2 px-4 py-2 transition-all duration-200 ${
                settings.voiceEnabled 
                  ? settings.highContrast
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-md'
                  : settings.highContrast
                    ? 'border-gray-400 text-white hover:bg-gray-700'
                    : 'hover:bg-green-50 hover:border-green-300'
              }`}
            >
              {settings.voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{getTranslatedText(
                settings.voiceEnabled ? 'Voice On' : 'Voice Off',
                settings.voiceEnabled ? 'आवाज़ चालू' : 'आवाज़ बंद'
              )}</span>
            </Button>

            <Button
              variant={isListening ? 'default' : 'outline'}
              size="sm"
              onClick={toggleVoiceRecognition}
              className={`flex items-center space-x-2 px-4 py-2 transition-all duration-200 ${
                isListening 
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-md animate-pulse' 
                  : settings.highContrast
                    ? 'border-gray-400 text-white hover:bg-gray-700'
                    : 'hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{getTranslatedText(
                isListening ? 'Listening...' : 'Voice Commands',
                isListening ? 'सुन रहा है...' : 'आवाज़ कमांड'
              )}</span>
            </Button>
          </div>

          {/* Language Toggle */}
          <div className={`flex items-center space-x-3 px-4 py-2 rounded-full shadow-sm ${
            settings.highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-white/80 backdrop-blur-sm'
          }`}>
            <Languages className={`w-5 h-5 ${settings.highContrast ? 'text-white' : 'text-blue-600'}`} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newLang = settings.language === 'english' ? 'hindi' : 'english';
                updateSettings({ language: newLang });
                speak(`Language changed to ${newLang}`);
              }}
              className={`text-xs px-4 py-1 transition-all duration-200 ${
                settings.highContrast
                  ? 'border-gray-400 text-white hover:bg-gray-700'
                  : 'hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              {settings.language === 'english' ? 'English | हिंदी' : 'हिंदी | English'}
            </Button>
          </div>

          {/* High Contrast Toggle */}
          <Button
            variant={settings.highContrast ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              updateSettings({ highContrast: !settings.highContrast });
              speak(`High contrast ${!settings.highContrast ? 'enabled' : 'disabled'}`);
            }}
            className={`flex items-center space-x-2 px-4 py-2 transition-all duration-200 ${
              settings.highContrast 
                ? 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-md' 
                : 'hover:bg-yellow-50 hover:border-yellow-300'
            }`}
          >
            <Contrast className="w-4 h-4" />
            <span>{getTranslatedText('High Contrast', 'उच्च कंट्रास्ट')}</span>
          </Button>

          {/* Navigation Help */}
          <div className={`text-xs px-3 py-1 rounded-full ${
            settings.highContrast 
              ? 'bg-white/10 text-white border border-gray-600' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {getTranslatedText(
              'Press Tab to navigate • Use Enter to select',
              'नेविगेट करने के लिए Tab दबाएं • चुनने के लिए Enter का उपयोग करें'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}