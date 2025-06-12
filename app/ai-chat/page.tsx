'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, Lightbulb, MessageCircle, Sparkles, Clock, Mic, MicOff, Volume2, VolumeX, RotateCcw, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
  rating?: 'up' | 'down' | null;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
}

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  language: 'english' | 'hindi';
  highContrast: boolean;
  voiceEnabled: boolean;
  speechRate: number;
}

export default function AIChat() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'medium',
    language: 'english',
    highContrast: false,
    voiceEnabled: false,
    speechRate: 0.8
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaste! I'm DLC Agent, your friendly digital learning assistant. I'm here to help you master digital tools with confidence. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('default');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // TypeScript: Declare SpeechRecognition type for browser compatibility
  type SpeechRecognitionType = typeof window extends { webkitSpeechRecognition: infer T }
    ? T
    : any;
  
  const recognitionRef = useRef<InstanceType<SpeechRecognitionType> | null>(null);

  const getTranslatedText = (englishText: string, hindiText: string) => {
    return settings.language === 'hindi' ? hindiText : englishText;
  };

  const suggestedQuestions = [
    getTranslatedText("How do I make a video call on WhatsApp?", "व्हाट्सऐप पर वीडियो कॉल कैसे करूं?"),
    getTranslatedText("What's the safest way to pay online?", "ऑनलाइन भुगतान का सबसे सुरक्षित तरीका क्या है?"),
    getTranslatedText("How do I find directions on Google Maps?", "गूगल मैप्स पर दिशा कैसे खोजूं?"),
    getTranslatedText("How can I share photos with my family?", "मैं अपने परिवार के साथ फोटो कैसे साझा कर सकता हूं?"),
    getTranslatedText("How do I create a strong password?", "मजबूत पासवर्ड कैसे बनाऊं?"),
    getTranslatedText("What should I do if I receive a suspicious message?", "संदिग्ध संदेश मिलने पर क्या करूं?"),
    getTranslatedText("How do I download apps safely?", "ऐप्स को सुरक्षित रूप से कैसे डाउनलोड करूं?"),
    getTranslatedText("How can I backup my photos?", "अपनी फोटो का बैकअप कैसे लूं?"),
    getTranslatedText("What is UPI and how do I use it?", "UPI क्या है और इसका उपयोग कैसे करूं?"),
    getTranslatedText("How do I block unwanted calls?", "अवांछित कॉल को कैसे ब्लॉक करूं?")
  ];

  const predefinedResponses: { [key: string]: string } = {
    "video call": getTranslatedText(
      "To make a video call on WhatsApp:\n\n1️⃣ Open WhatsApp and find your contact\n2️⃣ Tap the video camera icon at the top\n3️⃣ Wait for them to answer\n4️⃣ Enjoy your conversation!\n\n💡 Tip: Make sure you have good internet connection for the best experience!\n\n🔒 Safety: Only call people you know and trust.",
      "व्हाट्सऐप पर वीडियो कॉल करने के लिए:\n\n1️⃣ व्हाट्सऐप खोलें और अपना संपर्क खोजें\n2️⃣ ऊपर वीडियो कैमरा आइकन पर टैप करें\n3️⃣ उनके जवाब देने का इंतजार करें\n4️⃣ अपनी बातचीत का आनंद लें!\n\n💡 टिप: बेहतरीन अनुभव के लिए अच्छा इंटरनेट कनेक्शन सुनिश्चित करें!\n\n🔒 सुरक्षा: केवल उन लोगों को कॉल करें जिन्हें आप जानते और भरोसा करते हैं।"
    ),
    "pay online": getTranslatedText(
      "For safe online payments:\n\n🔐 Use only trusted apps like Paytm, PhonePe, or your bank's official app\n🔐 Never share your PIN or OTP with anyone\n🔐 Always double-check the amount before confirming\n🔐 Keep your phone locked with a password\n🔐 Only shop on websites that start with 'https://'\n\n✅ Remember: Banks will never ask for your PIN over phone or SMS!\n\n🚨 If something feels wrong, don't proceed with the payment.",
      "सुरक्षित ऑनलाइन भुगतान के लिए:\n\n🔐 केवल विश्वसनीय ऐप्स जैसे Paytm, PhonePe, या अपने बैंक के आधिकारिक ऐप का उपयोग करें\n🔐 अपना PIN या OTP किसी के साथ साझा न करें\n🔐 पुष्टि करने से पहले हमेशा राशि की दोबारा जांच करें\n🔐 अपने फोन को पासवर्ड से लॉक रखें\n🔐 केवल उन वेबसाइटों पर खरीदारी करें जो 'https://' से शुरू होती हैं\n\n✅ याद रखें: बैंक कभी भी फोन या SMS पर आपका PIN नहीं मांगेंगे!\n\n🚨 अगर कुछ गलत लगे, तो भुगतान न करें।"
    ),
    // Add more translated responses...
  };

  // Listen for accessibility settings changes
  useEffect(() => {
    const handleSettingsChange = (event: CustomEvent) => {
      setSettings(event.detail);
    };

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

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionConstructor =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (!SpeechRecognitionConstructor) return;

      const recognition = new SpeechRecognitionConstructor();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = settings.language === 'hindi' ? 'hi-IN' : 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [settings.language]);

  // Load chat sessions from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('chat-sessions');
    if (savedSessions) {
      setChatSessions(JSON.parse(savedSessions));
    }
  }, []);

  // Save chat sessions to localStorage
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chat-sessions', JSON.stringify(chatSessions));
    }
  }, [chatSessions]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.lang = settings.language === 'hindi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return getTranslatedText(
      "That's a wonderful question! I'm here to help you learn digital skills safely and easily. \n\n💡 You can ask me about:\n• WhatsApp, YouTube, Facebook, Gmail\n• Online payments and UPI\n• Google Maps and navigation\n• Photo sharing and backup\n• Online safety and security\n• App downloads and updates\n\nTry asking about a specific app or digital task, and I'll provide step-by-step guidance!",
      "यह एक बेहतरीन सवाल है! मैं यहाँ आपको डिजिटल कौशल सुरक्षित और आसानी से सीखने में मदद करने के लिए हूँ। \n\n💡 आप मुझसे पूछ सकते हैं:\n• व्हाट्सऐप, यूट्यूब, फेसबुक, जीमेल\n• ऑनलाइन भुगतान और UPI\n• गूगल मैप्स और नेवीगेशन\n• फोटो शेयरिंग और बैकअप\n• ऑनलाइन सुरक्षा\n• ऐप डाउनलोड और अपडेट\n\nकिसी विशिष्ट ऐप या डिजिटल कार्य के बारे में पूछें, और मैं चरणबद्ध मार्गदर्शन प्रदान करूंगा!"
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    const typingMessage: Message = {
      id: messages.length + 2,
      text: getTranslatedText("DLC Agent is thinking...", "DLC एजेंट सोच रहा है..."),
      isUser: false,
      timestamp: new Date(),
      isTyping: true
    };

    setMessages(prev => [...prev, typingMessage]);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      const responseText = getResponse(inputText);
      const aiResponse: Message = {
        id: messages.length + 3,
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      
      speak(responseText);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  const toggleVoiceRecognition = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const toggleVoiceOutput = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      speak(getTranslatedText("Voice output enabled", "आवाज़ आउटपुट सक्षम"));
    } else {
      window.speechSynthesis.cancel();
    }
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const rateMessage = (messageId: number, rating: 'up' | 'down') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ));
  };

  const startNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: getTranslatedText(`Chat ${chatSessions.length + 1}`, `चैट ${chatSessions.length + 1}`),
      messages: [...messages],
      timestamp: new Date()
    };
    
    setChatSessions(prev => [newSession, ...prev]);
    setMessages([{
      id: 1,
      text: getTranslatedText(
        "Namaste! I'm DLC Agent, your friendly digital learning assistant. I'm here to help you master digital tools with confidence. How can I assist you today?",
        "नमस्ते! मैं DLC एजेंट हूं, आपका मित्रवत डिजिटल लर्निंग असिस्टेंट। मैं यहां आपको आत्मविश्वास के साथ डिजिटल टूल्स में महारत हासिल करने में मदद करने के लिए हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?"
      ),
      isUser: false,
      timestamp: new Date()
    }]);
    setCurrentSessionId('default');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium mb-6 bg-green-100 text-green-800">
            <Sparkles className="w-4 h-4 mr-2" />
            {getTranslatedText('24/7 AI Assistant', '24/7 AI असिस्टेंट')}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            {getTranslatedText('Chat with', 'चैट करें')} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DLC Agent</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">
            {getTranslatedText(
              'Your friendly AI assistant for digital learning questions. Ask anything about apps, online safety, or digital tools - I\'m here to help you learn with confidence!',
              'डिजिटल लर्निंग प्रश्नों के लिए आपका मित्रवत AI असिस्टेंट। ऐप्स, ऑनलाइन सुरक्षा, या डिजिटल टूल्स के बारे में कुछ भी पूछें - मैं यहाँ आपको आत्मविश्वास के साथ सीखने में मदद करने के लिए हूँ!'
            )}
          </p>
        </div>

        {/* Main Chat Layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Quick Questions Sidebar - Left */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="shadow-xl border-0 mb-6 bg-white/90 backdrop-blur-sm">
              <CardHeader className="rounded-t-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-6 h-6" />
                  <span>{getTranslatedText('Quick Questions', 'त्वरित प्रश्न')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3 max-h-96 overflow-y-auto">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left h-auto py-4 px-5 justify-start text-wrap overflow-auto  transition-all duration-300 rounded-xl hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    <MessageCircle className="w-4 h-4 mr-3 flex-shrink-0 text-blue-600" />
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Chat History */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{getTranslatedText('Chat History', 'चैट इतिहास')}</span>
                  <Button size="sm" onClick={startNewChat}>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    {getTranslatedText('New', 'नया')}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-64 overflow-y-auto">
                {chatSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 rounded-lg cursor-pointer mb-2 transition-colors hover:bg-gray-50"
                    onClick={() => {
                      setMessages(session.messages);
                      setCurrentSessionId(session.id);
                    }}
                  >
                    <div className="font-medium text-sm">{session.title}</div>
                    {/* <div className="text-xs text-gray-500">
                      {session.timestamp.toLocaleDateString()}
                    </div> */}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface - Center */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card className="h-[700px] flex flex-col shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="rounded-t-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/20">
                    <Bot className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">DLC Agent</div>
                    <div className="text-sm flex items-center text-blue-100">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      {getTranslatedText('Always here to help', 'हमेशा मदद के लिए यहाँ')}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-5 ${message.isTyping ? 'animate-pulse' : ''} ${
                        message.isUser
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-3xl rounded-bl-3xl'
                          : 'bg-white text-gray-900 rounded-t-3xl rounded-br-3xl shadow-lg border'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {!message.isUser && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}
                        {message.isUser && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-white/20">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className={`leading-relaxed whitespace-pre-line ${
                            message.isUser 
                              ? 'text-white'
                              : 'text-gray-800'
                          }`}>
                            {message.text}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            {/* <p className={`text-xs flex items-center ${
                              message.isUser 
                                ? 'text-blue-100'
                                : 'text-gray-500'
                            }`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {message.timestamp.toLocaleTimeString()}
                            </p> */}
                            
                            {!message.isUser && !message.isTyping && (
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyMessage(message.text)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => rateMessage(message.id, 'up')}
                                  className={`h-6 w-6 p-0 ${message.rating === 'up' ? 'text-green-600' : ''}`}
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => rateMessage(message.id, 'down')}
                                  className={`h-6 w-6 p-0 ${message.rating === 'down' ? 'text-red-600' : ''}`}
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-6 border-t bg-white border-gray-200">
                <div className="flex space-x-4">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={getTranslatedText(
                      "Ask me anything about digital tools...",
                      "डिजिटल टूल्स के बारे में कुछ भी पूछें..."
                    )}
                    className="flex-1 text-lg h-14 border-2 rounded-2xl px-6 border-gray-200 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="px-8 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    disabled={!inputText.trim() || isTyping}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Voice Controls - Right */}
          <div className="lg:col-span-1 order-3">
            <Card className="shadow-xl border-0 mb-6 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  {getTranslatedText('Voice Controls', 'आवाज़ नियंत्रण')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant={voiceEnabled ? 'default' : 'outline'}
                  onClick={toggleVoiceOutput}
                  className="w-full"
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                  {voiceEnabled 
                    ? getTranslatedText('Voice On', 'आवाज़ चालू') 
                    : getTranslatedText('Voice Off', 'आवाज़ बंद')
                  }
                </Button>
                
                <Button
                  variant={isListening ? 'destructive' : 'outline'}
                  onClick={toggleVoiceRecognition}
                  className="w-full"
                  disabled={!recognitionRef.current}
                >
                  {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                  {isListening 
                    ? getTranslatedText('Stop Listening', 'सुनना बंद करें') 
                    : getTranslatedText('Voice Input', 'आवाज़ इनपुट')
                  }
                </Button>
              </CardContent>
            </Card>
          </div>
          
        </div>

        {/* Chat Tips and Safety - Below Chat */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Chat Tips */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Sparkles className="w-5 h-5 mr-2" />
                💡 {getTranslatedText('Chat Tips', 'चैट टिप्स')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-green-700">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-green-500"></div>
                <p>{getTranslatedText(
                  'Ask specific questions about apps and tools',
                  'ऐप्स और टूल्स के बारे में विशिष्ट प्रश्न पूछें'
                )}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-green-500"></div>
                <p>{getTranslatedText(
                  'Mention the device you\'re using (phone/computer)',
                  'अपने उपयोग किए जाने वाले डिवाइस का उल्लेख करें (फोन/कंप्यूटर)'
                )}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-green-500"></div>
                <p>{getTranslatedText(
                  'Use voice input for hands-free interaction',
                  'हैंड्स-फ्री इंटरैक्शन के लिए वॉयस इनपुट का उपयोग करें'
                )}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-green-500"></div>
                <p>{getTranslatedText(
                  'Rate responses to help me improve',
                  'मुझे बेहतर बनाने के लिए प्रतिक्रियाओं को रेट करें'
                )}</p>
              </div>
            </CardContent>
          </Card>

          {/* Safety Reminder */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">
                🛡️ {getTranslatedText('Safety First', 'सुरक्षा पहले')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-red-700">
              <p className="font-medium">
                {getTranslatedText('Remember:', 'याद रखें:')}
              </p>
              <p>• {getTranslatedText(
                'Never share personal information online',
                'व्यक्तिगत जानकारी ऑनलाइन साझा न करें'
              )}</p>
              <p>• {getTranslatedText(
                'Be cautious with unknown links or messages',
                'अज्ञात लिंक या संदेशों से सावधान रहें'
              )}</p>
              <p>• {getTranslatedText(
                'Always verify before making payments',
                'भुगतान करने से पहले हमेशा सत्यापित करें'
              )}</p>
              <p>• {getTranslatedText(
                'Ask family if you\'re unsure about something',
                'यदि आप किसी बात को लेकर अनिश्चित हैं तो परिवार से पूछें'
              )}</p>
              <p>• {getTranslatedText(
                'Report suspicious activities to 1930',
                'संदिग्ध गतिविधियों की रिपोर्ट 1930 पर करें'
              )}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}