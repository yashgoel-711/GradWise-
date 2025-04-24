import React, { useState } from 'react';
import studentService from '../../services/student.service';
import {useNavigate } from 'react-router'
import { useSelector } from 'react-redux';

const Navbar = () => {
  
  const Navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading , setIsLoading] = useState(false);
  const studentData = useSelector((state) => state.trackAuth.studentData);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    const response = await studentService.logout();
    if(response){
      setIsLoading(false);
      Navigate('/login')
    }

  }

  return (
    <>
      <div className={`${isExpanded ? 'w-64' : 'w-20'} h-screen bg-gray-900 text-white transition-all duration-300 fixed left-0 top-0 z-10`}>
        {/* Logo and Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isExpanded ? (
            <h1 className="text-xl font-bold text-indigo-400">GradWise</h1>
          ) : (
            <h1 className="text-xl font-bold text-indigo-400">GW</h1>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-gray-700"
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6">

          <div className="px-4">
            <NavItem icon="home" label="Dashboard" isExpanded={isExpanded} isActive={true} onClick={()=>{Navigate("/GradWise/dashboard")}} />
            <NavItem icon="calendar" label="Schedule" isExpanded={isExpanded} onClick={()=>{Navigate("/GradWise/schedule")}} />
            <NavItem icon="book" label="Courses" isExpanded={isExpanded} onClick={()=>{Navigate("/GradWise/courses")}}/>
            <NavItem icon="chart" label="Progress" isExpanded={isExpanded} onClick={()=>{Navigate("/GradWise/progress")}} />
            <NavItem icon="chat" label="Messages" isExpanded={isExpanded} onClick={()=>{Navigate("/GradWise/OpenAI-Help")}}/>
            <NavItem icon="portfolio" label="PortFolio" isExpanded={isExpanded} />
            <NavItem icon="opportunities" label="Opportunities" isExpanded={isExpanded} />
          </div>
          
          {/* Divider */}
          <div className="my-4 border-t border-gray-700"></div>

          
          <div className="px-4">
            <NavItem icon="settings" label="Settings" isExpanded={isExpanded} />
            <NavItem icon="help" label="Help" isExpanded={isExpanded} />
            <NavItem icon="logout" label="logout" isExpanded={isExpanded} onClick={handleSubmit} />
            
          </div>

        </nav>
        
        {/* User Profile */}
        <div className="absolute bottom-0 w-full border-t border-gray-700">
          <div className="flex items-center p-4">
            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
              <span className="font-medium text-white">JD</span>
            </div>
            {isExpanded && (
              <div className="ml-3">
                <p className="font-medium">{studentData.name}</p>
                <p className="text-sm text-gray-400">{studentData.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Helper component for nav items
const NavItem = ({ icon, label, isExpanded, isActive = false, onClick }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'opportunities':
      return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7l-4-4-10 10zm0 0v4h4m6-10l3 3" />
      </svg>
  );
      case 'portfolio':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v.01M16 12v.01M8 12v.01M4 7h16M4 7a2 2 0 012-2h12a2 2 0 012 2m-16 0v10a2 2 0 002 2h12a2 2 0 002-2V7M9 3h6a1 1 0 011 1v3H8V4a1 1 0 011-1z" />
        </svg>
       );
      case 'home':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'book':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'chat':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'settings':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
        case 'logout':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
          );
      case 'help':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`mt-2 flex items-center py-3 px-3 rounded-lg cursor-pointer ${
        isActive ? 'bg-indigo-600' : 'hover:bg-gray-800'
      }`}
    >
      <div className="flex items-center justify-center">
        {getIcon(icon)}
      </div>
      {isExpanded && <span className="ml-3">{label}</span>}
    </div>
  );
};

export default Navbar;
