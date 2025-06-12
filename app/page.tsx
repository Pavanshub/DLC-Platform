'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Shield, Award, ArrowRight, Star, Play, CheckCircle, TrendingUp, Heart, Zap } from 'lucide-react';

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  language: 'english' | 'hindi';
  highContrast: boolean;
  voiceEnabled: boolean;
  speechRate: number;
}

export default function Home() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'medium',
    language: 'english',
    highContrast: false,
    voiceEnabled: false,
    speechRate: 0.8
  });

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

  const getTranslatedText = (englishText: string, hindiText: string) => {
    return settings.language === 'hindi' ? hindiText : englishText;
  };

  const features = [
    {
      icon: BookOpen,
      title: getTranslatedText('Easy Tutorials', 'आसान ट्यूटोरियल'),
      description: getTranslatedText(
        'Step-by-step guides for popular apps and digital tools with video demonstrations and clear instructions.',
        'वीडियो प्रदर्शन और स्पष्ट निर्देशों के साथ लोकप्रिय ऐप्स और डिजिटल टूल्स के लिए चरणबद्ध गाइड।'
      ),
      color: 'bg-blue-50 text-blue-600',
      stats: getTranslatedText('50+ Tutorials', '50+ ट्यूटोरियल')
    },
    {
      icon: Users,
      title: getTranslatedText('Community Support', 'समुदायिक सहायता'),
      description: getTranslatedText(
        'Connect with others learning digital skills and share experiences in a safe, supportive environment.',
        'डिजिटल कौशल सीखने वाले अन्य लोगों से जुड़ें और एक सुरक्षित, सहायक वातावरण में अनुभव साझा करें।'
      ),
      color: 'bg-green-50 text-green-600',
      stats: getTranslatedText('10K+ Members', '10K+ सदस्य')
    },
    {
      icon: Shield,
      title: getTranslatedText('Safe Learning', 'सुरक्षित सीखना'),
      description: getTranslatedText(
        'Learn in a secure, judgment-free environment with privacy protection and safety guidelines.',
        'गोपनीयता सुरक्षा और सुरक्षा दिशानिर्देशों के साथ एक सुरक्षित, निर्णय-मुक्त वातावरण में सीखें।'
      ),
      color: 'bg-purple-50 text-purple-600',
      stats: getTranslatedText('100% Secure', '100% सुरक्षित')
    },
    {
      icon: Award,
      title: getTranslatedText('Track Progress', 'प्रगति ट्रैक करें'),
      description: getTranslatedText(
        'Monitor your learning journey and celebrate achievements with our progress tracking system.',
        'हमारे प्रगति ट्रैकिंग सिस्टम के साथ अपनी सीखने की यात्रा की निगरानी करें और उपलब्धियों का जश्न मनाएं।'
      ),
      color: 'bg-orange-50 text-orange-600',
      stats: getTranslatedText('Personal Dashboard', 'व्यक्तिगत डैशबोर्ड')
    }
  ];

  const testimonials = [
    {
      name: getTranslatedText("Rajesh Kumar", "राजेश कुमार"),
      age: getTranslatedText("68 years", "68 वर्ष"),
      location: getTranslatedText("Mumbai", "मुंबई"),
      quote: getTranslatedText(
        "Finally learned WhatsApp thanks to these simple tutorials! Now I can video call my grandchildren every day.",
        "इन सरल ट्यूटोरियल की बदौलत आखिरकार व्हाट्सऐप सीख गया! अब मैं अपने पोते-पोतियों को रोज वीडियो कॉल कर सकता हूं।"
      ),
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: getTranslatedText("Priya Singh", "प्रिया सिंह"),
      age: getTranslatedText("45 years", "45 वर्ष"), 
      location: getTranslatedText("Delhi", "दिल्ली"),
      quote: getTranslatedText(
        "The AI assistant helped me understand online payments safely. I feel confident shopping online now!",
        "AI असिस्टेंट ने मुझे ऑनलाइन पेमेंट को सुरक्षित रूप से समझने में मदद की। अब मैं ऑनलाइन शॉपिंग में आत्मविश्वास महसूस करती हूं!"
      ),
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: getTranslatedText("Amit Sharma", "अमित शर्मा"),
      age: getTranslatedText("52 years", "52 वर्ष"),
      location: getTranslatedText("Bangalore", "बैंगलोर"),
      quote: getTranslatedText(
        "Great platform for learning digital skills at my own pace. The tutorials are so easy to follow!",
        "अपनी गति से डिजिटल कौशल सीखने के लिए बेहतरीन प्लेटफॉर्म। ट्यूटोरियल का पालन करना बहुत आसान है!"
      ),
      rating: 5,
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const quickStats = [
    { 
      number: '10K+', 
      label: getTranslatedText('Happy Learners', 'खुश शिक्षार्थी'), 
      icon: Users 
    },
    { 
      number: '50+', 
      label: getTranslatedText('Video Tutorials', 'वीडियो ट्यूटोरियल'), 
      icon: Play 
    },
    { 
      number: '24/7', 
      label: getTranslatedText('AI Support', 'AI सहायता'), 
      icon: Zap 
    },
    { 
      number: '100%', 
      label: getTranslatedText('Free Access', 'मुफ्त पहुंच'), 
      icon: Heart 
    }
  ];

  const popularTutorials = [
    {
      title: getTranslatedText('WhatsApp Basics', 'व्हाट्सऐप बेसिक्स'),
      description: getTranslatedText('Learn messaging, calls, and photo sharing', 'मैसेजिंग, कॉल और फोटो शेयरिंग सीखें'),
      duration: getTranslatedText('15 min', '15 मिनट'),
      difficulty: getTranslatedText('Beginner', 'शुरुआती'),
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      title: getTranslatedText('Online Payments', 'ऑनलाइन पेमेंट'),
      description: getTranslatedText('Safe digital payments with UPI apps', 'UPI ऐप्स के साथ सुरक्षित डिजिटल पेमेंट'),
      duration: getTranslatedText('20 min', '20 मिनट'),
      difficulty: getTranslatedText('Intermediate', 'मध्यम'),
      image: 'https://images.pexels.com/photos/919734/pexels-photo-919734.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      title: getTranslatedText('Google Maps', 'गूगल मैप्स'),
      description: getTranslatedText('Navigation and finding locations', 'नेवीगेशन और स्थान खोजना'),
      duration: getTranslatedText('12 min', '12 मिनट'),
      difficulty: getTranslatedText('Beginner', 'शुरुआती'),
      image: 'https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/10 to-purple-400/10"></div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium mb-8 animate-bounce bg-blue-100 text-blue-800">
            <Star className="w-4 h-4 mr-2 fill-current" />
            {getTranslatedText('Trusted by 10,000+ learners across India', 'भारत भर में 10,000+ शिक्षार्थियों द्वारा भरोसा किया गया')}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {getTranslatedText('Empowering Digital', 'डिजिटल सशक्तिकरण')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {getTranslatedText('Literacy!', 'साक्षरता!')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-600">
            {getTranslatedText(
              'This platform helps our parents and elders master digital tools with ease! Learn at your own pace with simple, step-by-step guidance designed just for you.',
              'यह प्लेटफॉर्म हमारे माता-पिता और बुजुर्गों को डिजिटल टूल्स में आसानी से महारत हासिल करने में मदद करता है! आपके लिए विशेष रूप से डिज़ाइन किए गए सरल, चरणबद्ध मार्गदर्शन के साथ अपनी गति से सीखें।'
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/tutorials">
              <Button size="lg" className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                {getTranslatedText('Explore Tutorials', 'ट्यूटोरियल देखें')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/ai-chat">
              <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-2 transition-all duration-300 group hover:bg-blue-50 hover:border-blue-300">
                <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {getTranslatedText('Chat with DLC Agent', 'DLC एजेंट से चैट करें')}
              </Button>
            </Link>
          </div>

          {/* Enhanced Hero Visual */}
          <div className="relative">
            <div className="w-full max-w-5xl mx-auto h-96 rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
              <div className="absolute inset-0 group-hover:bg-black/10 transition-all duration-500 bg-black/20"></div>
              <div className="relative z-10 h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500 bg-white/20">
                    <BookOpen className="w-16 h-16" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">
                    {getTranslatedText('Your Digital Learning Journey', 'आपकी डिजिटल सीखने की यात्रा')}
                  </h3>
                  <p className="text-xl opacity-90">
                    {getTranslatedText('Starts Here, Today!', 'यहाँ से शुरू होती है, आज!')}
                  </p>
                  <Button className="mt-6 backdrop-blur-sm border transition-all duration-300 bg-white/20 hover:bg-white/30 border-white/30">
                    <Play className="w-5 h-5 mr-2" />
                    {getTranslatedText('Watch Demo', 'डेमो देखें')}
                  </Button>
                </div>
              </div>
              
              {/* Floating elements for visual interest */}
              <div className="absolute top-10 left-10 w-20 h-20 rounded-full animate-pulse bg-white/10"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full animate-pulse delay-300 bg-white/10"></div>
              <div className="absolute top-1/2 right-20 w-12 h-12 rounded-full animate-pulse delay-700 bg-white/10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold mb-2 text-gray-900">{stat.number}</div>
                <div className="font-medium text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {getTranslatedText('Why Choose Our Platform?', 'हमारा प्लेटफॉर्म क्यों चुनें?')}
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">
            {getTranslatedText(
              'Designed specifically for seniors and parents who want to stay connected and confident in the digital world',
              'विशेष रूप से उन बुजुर्गों और माता-पिता के लिए डिज़ाइन किया गया है जो डिजिटल दुनिया में जुड़े रहना और आत्मविश्वास रखना चाहते हैं'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors text-gray-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed mb-4 text-gray-600">{feature.description}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {feature.stats}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Tutorials Preview */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {getTranslatedText('Popular Tutorials', 'लोकप्रिय ट्यूटोरियल')}
            </h2>
            <p className="text-xl text-gray-600">
              {getTranslatedText('Start with these beginner-friendly lessons', 'इन शुरुआती-अनुकूल पाठों से शुरुआत करें')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {popularTutorials.map((tutorial, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
                <div className="relative">
                  <img
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button className="text-gray-900 hover:bg-white bg-white/90">
                        <Play className="w-5 h-5 mr-2" />
                        {getTranslatedText('Watch Now', 'अभी देखें')}
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {tutorial.duration}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{tutorial.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tutorial.difficulty === getTranslatedText('Beginner', 'शुरुआती')
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all text-gray-400 group-hover:text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/tutorials">
              <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                {getTranslatedText('View All Tutorials', 'सभी ट्यूटोरियल देखें')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {getTranslatedText('What Our Learners Say', 'हमारे शिक्षार्थी क्या कहते हैं')}
            </h2>
            <p className="text-xl text-gray-600">
              {getTranslatedText('Real experiences from real people across India', 'भारत भर के वास्तविक लोगों के वास्तविक अनुभव')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-purple-50 border-red-200">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.age}</p>
                      <p className="text-sm text-blue-600">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="italic text-lg leading-relaxed text-gray-700">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full animate-pulse bg-white/5"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full animate-pulse delay-500 bg-white/5"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full animate-pulse delay-1000 bg-white/5"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {getTranslatedText('Ready to Start Learning?', 'सीखना शुरू करने के लिए तैयार हैं?')}
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            {getTranslatedText(
              'Join thousands of seniors who have already transformed their digital skills and connected with the world around them',
              'हजारों बुजुर्गों से जुड़ें जिन्होंने पहले ही अपने डिजिटल कौशल को बदल दिया है और अपने आसपास की दुनिया से जुड़े हैं'
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/tutorials">
              <Button size="lg" variant="secondary" className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-blue-600 hover:bg-gray-100">
                <BookOpen className="w-5 h-5 mr-2" />
                {getTranslatedText('Browse Tutorials', 'ट्यूटोरियल ब्राउज़ करें')}
              </Button>
            </Link>
            <Link href="/ai-chat">
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white transition-all duration-300 hover:text-blue-600">
                <Zap className="w-5 h-5 mr-2" />
                {getTranslatedText('Try AI Assistant', 'AI असिस्टेंट आज़माएं')}
              </Button>
            </Link>
            <Link href="/feedback">
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white transition-all duration-300 hover:text-blue-600">
                <Heart className="w-5 h-5 mr-2" />
                {getTranslatedText('Share Feedback', 'फीडबैक साझा करें')}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold">{stat.number}</div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">
              {getTranslatedText('Trusted by Families Across India', 'भारत भर के परिवारों द्वारा भरोसा किया गया')}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-lg font-medium">
                  {getTranslatedText('Safe & Secure', 'सुरक्षित और संरक्षित')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-medium">
                  {getTranslatedText('Proven Results', 'सिद्ध परिणाम')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-red-600" />
                <span className="text-lg font-medium">
                  {getTranslatedText('Community Loved', 'समुदाय द्वारा प्रिय')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-purple-600" />
                <span className="text-lg font-medium">
                  {getTranslatedText('Privacy Protected', 'गोपनीयता संरक्षित')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}