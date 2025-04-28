



import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Users, Bell, BookOpen } from 'lucide-react'

const Community = () => {
  const [newsletters, setNewsletters] = useState([
    {
      id: 1,
      title: "Welcome to Spring Semester!",
      excerpt: "Check out our upcoming events and workshops for this semester.",
      date: "April 15, 2025",
      icon: "bell"
    },
    {
      id: 2,
      title: "Hackathon Results Announced",
      excerpt: "Congratulations to all participants in our annual coding competition.",
      date: "April 10, 2025",
      icon: "users"
    },
    {
      id: 3,
      title: "New Learning Resources Available",
      excerpt: "We've added new tutorials and practice exercises to help you master key concepts.",
      date: "April 3, 2025",
      icon: "book"
    }
  ]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDiscordRedirect = () => {
    // Replace with your actual Discord invite link
    window.open('https://discord.gg/cTfzHqVn', '_blank');
  };

  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'bell': return <Bell className="text-yellow-500" />;
      case 'users': return <Users className="text-blue-500" />;
      case 'book': return <BookOpen className="text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
      {/* Animated background shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 right-40 w-40 h-40 bg-pink-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-40 w-56 h-56 bg-green-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className={`max-w-4xl mx-auto p-6 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Our Student Community</h1>
          <p className="text-lg mb-8 text-gray-700">Connect with fellow students, get help with assignments, and stay updated on the latest news!</p>
          
          <button 
            onClick={handleDiscordRedirect}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg flex items-center mx-auto transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Join Our Discord Community
            <ArrowUpRight className="ml-2" size={20} />
          </button>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-indigo-800">Community Newsletters</h2>
          
          <div className="space-y-6">
            {newsletters.map((newsletter, index) => (
              <div 
                key={newsletter.id} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-indigo-400"
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  animation: `fadeIn 0.5s ease-out ${index * 150}ms both`
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-indigo-50 rounded-full">
                      {renderIcon(newsletter.icon)}
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">{newsletter.title}</h3>
                  </div>
                  <span className="text-sm text-gray-500 bg-indigo-50 px-2 py-1 rounded-full">{newsletter.date}</span>
                </div>
                <p className="mt-2 text-gray-600 ml-12">{newsletter.excerpt}</p>
                <button className="mt-4 ml-12 text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center group">
                  Read more 
                  <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Community;