'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MessageSquare, Send, Heart, Star, Users, TrendingUp, CheckCircle, Award, Target, Lightbulb } from 'lucide-react';

interface FeedbackData {
  name: string;
  ageGroup: string;
  email: string;
  phone: string;
  feedback: string;
  rating: string;
  category: string;
  wouldRecommend: string;
  improvements: string[];
  favoriteFeature: string;
}

interface StoredFeedback extends FeedbackData {
  id: string;
  timestamp: Date;
}

export default function Feedback() {
  const [formData, setFormData] = useState<FeedbackData>({
    name: '',
    ageGroup: '',
    email: '',
    phone: '',
    feedback: '',
    rating: '',
    category: '',
    wouldRecommend: '',
    improvements: [],
    favoriteFeature: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FeedbackData>>({});
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState<StoredFeedback[]>([]);

  const improvementOptions = [
    'More video tutorials',
    'Better search functionality',
    'Mobile app',
    'Offline content',
    'More languages',
    'Live chat support',
    'Community forums',
    'Progress tracking'
  ];

  const feedbackCategories = [
    'General Experience',
    'Tutorial Quality',
    'AI Assistant',
    'Website Design',
    'Accessibility',
    'Technical Issues',
    'Feature Request',
    'Other'
  ];

  // Load submitted feedbacks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('submitted-feedbacks');
    if (saved) {
      setSubmittedFeedbacks(JSON.parse(saved));
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FeedbackData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.ageGroup) newErrors.ageGroup = 'Age group is required';
    if (!formData.feedback.trim()) newErrors.feedback = 'Feedback is required';
    if (!formData.rating) newErrors.rating = 'Rating is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.wouldRecommend) newErrors.wouldRecommend = 'Recommendation is required';

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newFeedback: StoredFeedback = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    const updatedFeedbacks = [newFeedback, ...submittedFeedbacks];
    setSubmittedFeedbacks(updatedFeedbacks);
    localStorage.setItem('submitted-feedbacks', JSON.stringify(updatedFeedbacks));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        ageGroup: '',
        email: '',
        phone: '',
        feedback: '',
        rating: '',
        category: '',
        wouldRecommend: '',
        improvements: [],
        favoriteFeature: ''
      });
      setErrors({});
    }, 5000);
  };

  const handleInputChange = (field: keyof FeedbackData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImprovementToggle = (improvement: string) => {
    const current = formData.improvements;
    const updated = current.includes(improvement)
      ? current.filter(item => item !== improvement)
      : [...current, improvement];
    handleInputChange('improvements', updated);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full text-center bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="py-16 px-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Your feedback has been received and is invaluable to us. 
              We truly appreciate you taking the time to help us improve our platform!
            </p>
            <div className="flex items-center justify-center space-x-2 text-green-600 mb-6">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Your voice matters to our community</span>
              <Heart className="w-5 h-5" />
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-800 font-medium">Feedback ID: #{submittedFeedbacks[0]?.id}</p>
              <p className="text-green-600 text-sm">We&apos;ll review your feedback within 24 hours</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4 mr-2" />
            Your voice matters
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Share Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Feedback</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your thoughts and experiences help us create better learning experiences for 
            our entire community. Every piece of feedback makes a difference!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="text-xl">Tell Us About Your Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-lg font-semibold text-gray-700">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className={`text-lg p-4 h-14 border-2 rounded-xl ${
                          errors.name ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                        }`}
                        required
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="age-group" className="text-lg font-semibold text-gray-700">
                        Age Group *
                      </Label>
                      <Select 
                        value={formData.ageGroup} 
                        onValueChange={(value) => handleInputChange('ageGroup', value)}
                        required
                      >
                        <SelectTrigger className={`text-lg p-4 h-14 border-2 rounded-xl ${
                          errors.ageGroup ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                        }`}>
                          <SelectValue placeholder="Select your age group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-30">18-30 years</SelectItem>
                          <SelectItem value="31-45">31-45 years</SelectItem>
                          <SelectItem value="46-60">46-60 years</SelectItem>
                          <SelectItem value="61-75">61-75 years</SelectItem>
                          <SelectItem value="75+">75+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.ageGroup && <p className="text-red-500 text-sm">{errors.ageGroup}</p>}
                    </div>
                  </div>

                  {/* Contact Information (Optional) */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-lg font-semibold text-gray-700">
                        Email (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className={`text-lg p-4 h-14 border-2 rounded-xl ${
                          errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-lg font-semibold text-gray-700">
                        Phone Number (Optional)
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="9876543210"
                        className={`text-lg p-4 h-14 border-2 rounded-xl ${
                          errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Feedback Category */}
                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-lg font-semibold text-gray-700">
                      Feedback Category *
                    </Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleInputChange('category', value)}
                      required
                    >
                      <SelectTrigger className={`text-lg p-4 h-14 border-2 rounded-xl ${
                        errors.category ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}>
                        <SelectValue placeholder="Select feedback category" />
                      </SelectTrigger>
                      <SelectContent>
                        {feedbackCategories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                  </div>

                  {/* Rating */}
                  <div className="space-y-3">
                    <Label htmlFor="rating" className="text-lg font-semibold text-gray-700">
                      How would you rate your experience? *
                    </Label>
                    <Select 
                      value={formData.rating} 
                      onValueChange={(value) => handleInputChange('rating', value)}
                      required
                    >
                      <SelectTrigger className={`text-lg p-4 h-14 border-2 rounded-xl ${
                        errors.rating ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}>
                        <SelectValue placeholder="Rate your experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</SelectItem>
                        <SelectItem value="4">⭐⭐⭐⭐ Very Good (4/5)</SelectItem>
                        <SelectItem value="3">⭐⭐⭐ Good (3/5)</SelectItem>
                        <SelectItem value="2">⭐⭐ Fair (2/5)</SelectItem>
                        <SelectItem value="1">⭐ Needs Improvement (1/5)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                  </div>

                  {/* Recommendation */}
                  <div className="space-y-3">
                    <Label htmlFor="recommend" className="text-lg font-semibold text-gray-700">
                      Would you recommend our platform to others? *
                    </Label>
                    <Select 
                      value={formData.wouldRecommend} 
                      onValueChange={(value) => handleInputChange('wouldRecommend', value)}
                      required
                    >
                      <SelectTrigger className={`text-lg p-4 h-14 border-2 rounded-xl ${
                        errors.wouldRecommend ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}>
                        <SelectValue placeholder="Would you recommend us?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="definitely">Definitely Yes</SelectItem>
                        <SelectItem value="probably">Probably Yes</SelectItem>
                        <SelectItem value="maybe">Maybe</SelectItem>
                        <SelectItem value="probably-not">Probably Not</SelectItem>
                        <SelectItem value="definitely-not">Definitely Not</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.wouldRecommend && <p className="text-red-500 text-sm">{errors.wouldRecommend}</p>}
                  </div>

                  {/* Improvements */}
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-700">
                      What improvements would you like to see? (Select all that apply)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {improvementOptions.map((option) => (
                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.improvements.includes(option)}
                            onChange={() => handleImprovementToggle(option)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Favorite Feature */}
                  <div className="space-y-3">
                    <Label htmlFor="favorite" className="text-lg font-semibold text-gray-700">
                      What&apos;s your favorite feature?
                    </Label>
                    <Input
                      id="favorite"
                      type="text"
                      value={formData.favoriteFeature}
                      onChange={(e) => handleInputChange('favoriteFeature', e.target.value)}
                      placeholder="Tell us what you love most about our platform"
                      className="text-lg p-4 h-14 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  {/* Detailed Feedback */}
                  <div className="space-y-3">
                    <Label htmlFor="feedback" className="text-lg font-semibold text-gray-700">
                      Your Detailed Feedback *
                    </Label>
                    <Textarea
                      id="feedback"
                      value={formData.feedback}
                      onChange={(e) => handleInputChange('feedback', e.target.value)}
                      placeholder="Share your thoughts about our platform, tutorials, AI assistant, or any suggestions for improvement..."
                      className={`text-lg p-4 min-h-[140px] resize-none border-2 rounded-xl ${
                        errors.feedback ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      required
                    />
                    {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback}</p>}
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Please tell us what you liked most, what could be improved, or any new features 
                      you&apos;d like to see. Your honest feedback helps us serve you better!
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Why Feedback Matters */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  Why Your Feedback Matters
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold">Improve Tutorials</p>
                    <p className="text-sm">Help us create better, clearer learning content</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold">Fix Issues</p>
                    <p className="text-sm">Report problems so we can solve them quickly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold">New Features</p>
                    <p className="text-sm">Suggest features that would help you learn better</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold">Build Community</p>
                    <p className="text-sm">Create a better platform for everyone</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Users className="w-6 h-6 mr-2" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="text-green-700 space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-800">{submittedFeedbacks.length + 2500}+</div>
                  <div className="text-sm">Feedback responses received</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-800">4.8/5</div>
                  <div className="text-sm flex items-center justify-center">
                    Average rating
                    <Star className="w-4 h-4 ml-1 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-800">95%</div>
                  <div className="text-sm">Satisfaction rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-800">24hrs</div>
                  <div className="text-sm">Average response time</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Improvements */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center">
                  <Award className="w-6 h-6 mr-2" />
                  Recent Improvements
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-700 space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Added voice input/output features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Enhanced tutorial search & filters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Improved mobile experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Better accessibility features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Enhanced AI chat responses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Added chat history & favorites</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}