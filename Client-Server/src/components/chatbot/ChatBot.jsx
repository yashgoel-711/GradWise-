import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
const ChatBot = () => {
    const Navigate = useNavigate()
  const [isAnimating, setIsAnimating] = useState(false);
  const [animation, setAnimation] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef(null);
  const messageTimeoutRef = useRef(null);

  // Funny Hinglish/Hindi messages as requested
  const hoverMessages = [
    "Haan bhai, yaad kiya mujhe?",
    "Haan bhai, aur kya haal hain?",
    "Kya baat hai, humko bulaya?",
    "Main hoon na, batao kya help chahiye?",
    "Arre wah, aap aa gaye!",
    "Kuch help chahiye kya bhai?",
    "Bolo na, kya puchna hai?",
    "Main ready hoon, poocho jo poochna hai!",
    "Aapka digital dost hazir hai!",
    "Arre, hover kar rahe ho? Kuch puchna hai?"
  ];

  // Random messages for periodic display
  const randomMessages = [
    "Click karo, baat karenge!",
    "Help chahiye? Main hoon na!",
    "Kuch sawaal hai? Poocho!",
    "GradWise ke baare mein jaankari chahiye?",
    "Beep boop! Kya help chahiye?",
    "Kuch confusion hai? Batao mujhe!",
    "Aapki seva mein hazir!",
    "Kya soch rahe ho? Poocho na!",
    "Sawaal hai? Jawab hai mere paas!",
    "Hello! Kuch help chahiye?"
  ];

  // Function to show a random message from the regular pool
  const displayRandomMessage = () => {
    if (isHovering) return; // Don't show random messages while hovering
    
    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    setMessage(randomMessages[randomIndex]);
    setShowMessage(true);
    
    // Clear any existing timeout
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    // Hide message after 3 seconds
    messageTimeoutRef.current = setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  // Function to show a hover message
  const displayHoverMessage = () => {
    const randomIndex = Math.floor(Math.random() * hoverMessages.length);
    setMessage(hoverMessages[randomIndex]);
    setShowMessage(true);
  };

  // Function to trigger a random animation
  const triggerRandomAnimation = () => {
    const animations = ['bounce', 'wave', 'pulse'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    
    setAnimation(randomAnimation);
    setIsAnimating(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Remove animation class after animation completes
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  // Hover handlers
  const handleMouseEnter = () => {
    setIsHovering(true);
    displayHoverMessage();
    triggerRandomAnimation();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowMessage(false);
  };

  // Initialize periodic animations and messages
  useEffect(() => {
    // Show initial message after a short delay
    const initialMessageTimer = setTimeout(() => {
      displayRandomMessage();
    }, 2000);
    
    // Set up intervals for random animations and messages
    const animationInterval = setInterval(() => {
      if (Math.random() > 0.5 && !isHovering) { // 50% chance to animate if not hovering
        triggerRandomAnimation();
      }
    }, 8000);
    
    const messageInterval = setInterval(() => {
      if (Math.random() > 0.7 && !isHovering) { // 30% chance to show message if not hovering
        displayRandomMessage();
      }
    }, 15000);
    
    // Clean up all intervals and timeouts on unmount
    return () => {
      clearTimeout(initialMessageTimer);
      clearInterval(animationInterval);
      clearInterval(messageInterval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    };
  }, [isHovering]);

  const handleClick = () => {
    // Navigate to help page (keeping your existing functionality)
    Navigate("/GradWise/OpenAI-Help");
    
    // Also trigger animation and message for feedback
    triggerRandomAnimation();
    setMessage("Chalo, help page pe le chalta hoon!");
    setShowMessage(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Speech bubble */}
      {showMessage && (
        <div className="absolute bottom-full right-0 mb-3 p-3 bg-white rounded-lg shadow-lg max-w-xs text-sm font-medium text-gray-700 transform transition-all duration-300 ease-in-out">
          {message}
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
        </div>
      )}
      
      {/* Chatbot image with animations */}
      <img
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        src="https://res.cloudinary.com/dip0evlp9/image/upload/v1745919572/Chatbot_kwkr0k.png"
        alt="Chatbot"
        className={`w-25 h-25 cursor-pointer transition-transform
                   ${isHovering ? 'scale-110' : ''}
                   ${isAnimating ? animation : ''}
                  `}
      />
      
      {/* CSS for animations */}
      <style >{`
        .bounce {
          animation: bounce 1s;
        }
        
        .wave {
          animation: wave 1s;
        }
        
        .pulse {
          animation: pulse 1s;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0) ${isHovering ? 'scale(1.1)' : ''}; }
          50% { transform: translateY(-15px) ${isHovering ? 'scale(1.1)' : ''}; }
        }
        
        @keyframes wave {
          0% { transform: rotate(0deg) ${isHovering ? 'scale(1.1)' : ''}; }
          25% { transform: rotate(-10deg) ${isHovering ? 'scale(1.1)' : ''}; }
          50% { transform: rotate(10deg) ${isHovering ? 'scale(1.1)' : ''}; }
          75% { transform: rotate(-5deg) ${isHovering ? 'scale(1.1)' : ''}; }
          100% { transform: rotate(0deg) ${isHovering ? 'scale(1.1)' : ''}; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(${isHovering ? '1.1' : '1'}); }
          50% { transform: scale(${isHovering ? '1.2' : '1.1'}); }
        }
      `}</style>
    </div>
  );
};

export default ChatBot;