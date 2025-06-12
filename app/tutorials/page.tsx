'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, ExternalLink, Clock, Users, Search, Filter, Star, BookOpen, Eye, ThumbsUp, Download, Share2 } from 'lucide-react';

interface Tutorial {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  views: string;
  rating: number;
  likes: number;
  downloadCount: number;
  videoUrl?: string;
  tags: string[];
  instructor: string;
  lastUpdated: string;
}

export default function Tutorials() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);

  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: 'WhatsApp Basics - Complete Guide',
      description: 'Learn how to send messages, make calls, share photos, and use WhatsApp safely with family and friends.',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Communication',
      duration: '15 min',
      difficulty: 'Beginner',
      views: '25K',
      rating: 4.8,
      likes: 1250,
      downloadCount: 890,
      tags: ['messaging', 'video calls', 'photo sharing'],
      instructor: 'Priya Sharma',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'Google Maps Navigation Mastery',
      description: 'Master finding directions, searching locations, using GPS navigation, and discovering nearby places safely.',
      image: 'https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Navigation',
      duration: '12 min',
      difficulty: 'Beginner',
      views: '18K',
      rating: 4.9,
      likes: 980,
      downloadCount: 650,
      tags: ['GPS', 'directions', 'location'],
      instructor: 'Rajesh Kumar',
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      title: 'Paytm & UPI Digital Payments',
      description: 'Secure digital payment methods, UPI transfers, bill payments, and online shopping safety made simple.',
      image: 'https://images.pexels.com/photos/919734/pexels-photo-919734.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Payments',
      duration: '20 min',
      difficulty: 'Intermediate',
      views: '32K',
      rating: 4.7,
      likes: 1560,
      downloadCount: 1200,
      tags: ['UPI', 'payments', 'security'],
      instructor: 'Amit Singh',
      lastUpdated: '2024-01-20'
    },
    {
      id: 4,
      title: 'YouTube Entertainment & Learning',
      description: 'Discover videos, create playlists, subscribe to channels, and enjoy entertainment content safely.',
      image: 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Entertainment',
      duration: '10 min',
      difficulty: 'Beginner',
      views: '22K',
      rating: 4.6,
      likes: 890,
      downloadCount: 450,
      tags: ['videos', 'entertainment', 'playlists'],
      instructor: 'Sunita Devi',
      lastUpdated: '2024-01-08'
    },
    {
      id: 5,
      title: 'Email Essentials - Gmail Guide',
      description: 'Send, receive, organize emails with confidence. Learn about attachments, folders, and security tips.',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Communication',
      duration: '18 min',
      difficulty: 'Beginner',
      views: '28K',
      rating: 4.8,
      likes: 1340,
      downloadCount: 780,
      tags: ['email', 'Gmail', 'attachments'],
      instructor: 'Vikram Patel',
      lastUpdated: '2024-01-12'
    },
    {
      id: 6,
      title: 'Online Shopping Safety Guide',
      description: 'Shop online securely, compare prices, read reviews, and avoid common scams and fraudulent websites.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shopping',
      duration: '25 min',
      difficulty: 'Intermediate',
      views: '35K',
      rating: 4.9,
      likes: 1890,
      downloadCount: 1450,
      tags: ['shopping', 'security', 'scams'],
      instructor: 'Meera Gupta',
      lastUpdated: '2024-01-18'
    },
    {
      id: 7,
      title: 'Video Calling with Family',
      description: 'Connect with loved ones using video calls on WhatsApp, Zoom, and Google Meet platforms.',
      image: 'https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Communication',
      duration: '14 min',
      difficulty: 'Beginner',
      views: '19K',
      rating: 4.7,
      likes: 750,
      downloadCount: 520,
      tags: ['video calls', 'family', 'Zoom'],
      instructor: 'Anita Sharma',
      lastUpdated: '2024-01-05'
    },
    {
      id: 8,
      title: 'Social Media Safety & Privacy',
      description: 'Stay connected safely on Facebook and Instagram with proper privacy settings and security measures.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Social Media',
      duration: '22 min',
      difficulty: 'Intermediate',
      views: '41K',
      rating: 4.8,
      likes: 2100,
      downloadCount: 1680,
      tags: ['Facebook', 'Instagram', 'privacy'],
      instructor: 'Ravi Kumar',
      lastUpdated: '2024-01-22'
    }
  ];

  const categories = ['All', 'Communication', 'Navigation', 'Payments', 'Entertainment', 'Shopping', 'Social Media'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'duration', label: 'Shortest First' }
  ];

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('tutorial-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('tutorial-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (tutorialId: number) => {
    setFavorites(prev => 
      prev.includes(tutorialId) 
        ? prev.filter(id => id !== tutorialId)
        : [...prev, tutorialId]
    );
  };

  const filteredAndSortedTutorials = tutorials
    .filter(tutorial => {
      const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || tutorial.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'popular':
        default:
          return parseInt(b.views.replace('K', '000')) - parseInt(a.views.replace('K', '000'));
      }
    });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleShare = async (tutorial: Tutorial) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tutorial.title,
          text: tutorial.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${tutorial.title} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Learn at your own pace
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learning <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tutorials</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Easy-to-follow video tutorials designed specifically for seniors and parents. 
            Master digital tools with confidence through our step-by-step guidance.
          </p>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <Input
                type="text"
                placeholder="Search tutorials, topics, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 text-lg h-16 border-2 border-gray-200 focus:border-blue-500 rounded-2xl shadow-sm"
              />
            </div>
            
            <div className="flex items-center space-x-3 bg-gray-50 px-6 py-4 rounded-2xl">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium text-lg">Advanced Filters</span>
            </div>
          </div>
          
          {/* Filter Controls */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`transition-all duration-300 ${
                      selectedCategory === category 
                        ? 'bg-blue-600 hover:bg-blue-700 shadow-md' 
                        : 'hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`transition-all duration-300 ${
                      selectedDifficulty === difficulty 
                        ? 'bg-green-600 hover:bg-green-700 shadow-md' 
                        : 'hover:bg-green-50 hover:border-green-300'
                    }`}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full">
              <span className="text-lg">
                Showing <span className="font-bold">{filteredAndSortedTutorials.length}</span> tutorial{filteredAndSortedTutorials.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Tutorials Grid/List */}
        <div className={`mb-16 ${
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
            : 'space-y-6'
        }`}>
          {filteredAndSortedTutorials.map((tutorial) => (
            <Card key={tutorial.id} className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm ${
              viewMode === 'list' ? 'flex flex-row' : ''
            }`}>
              <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                    viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="bg-white/90 text-gray-900 hover:bg-white shadow-lg">
                      <Play className="w-6 h-6 mr-2" />
                      Watch Now
                    </Button>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {tutorial.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {tutorial.duration}
                  </span>
                </div>
                
                {/* Difficulty Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(tutorial.id)}
                  className="absolute bottom-3 right-3 bg-white/80 hover:bg-white"
                >
                  <Star className={`w-4 h-4 ${favorites.includes(tutorial.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                </Button>
              </div>
              
              <div className="flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">
                    {tutorial.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500">By {tutorial.instructor}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {tutorial.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tutorial.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {tutorial.views} views
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {tutorial.rating}
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {tutorial.likes} likes
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {tutorial.downloadCount}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                      <Play className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(tutorial)}
                      className="px-3"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredAndSortedTutorials.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No tutorials found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search terms or filters</p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}>
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 text-center border border-blue-100 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Personal Help?</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our tutorials are designed to be simple and easy to follow. If you need assistance, 
              our AI assistant is available 24/7 to help answer your questions!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-chat">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg">
                  Ask DLC Agent
                </Button>
              </Link>
              <Link href="/feedback">
                <Button size="lg" variant="outline" className="border-2 hover:bg-blue-50 px-8 py-4 text-lg">
                  Share Feedback
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}