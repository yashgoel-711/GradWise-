import React, { useState, useRef, useEffect } from 'react';
import { User, HelpCircle, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import studentService from '../../../services/student.service';
import { useNavigate } from 'react-router';

const DropDownNav = () => {
    const Navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  
  // Fixed the selector by adding the return statement
  const studentData = useSelector((state) => state.trackAuth.studentData);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await studentService.logout();
    if(response){
      setIsLoading(false);
      Navigate('/login');
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const navItems = [
    { 
      icon: <User size={18} />, 
      label: 'Profile', 
      link: '/GradWise/profile',
      color: 'text-indigo-600'
    },
    { 
      icon: <HelpCircle size={18} />, 
      label: 'Help', 
      // link commented out as in the provided code
      // link: '/GradWise/help',
      color: 'text-blue-600'
    },
    { 
      icon: <Settings size={18} />, 
      label: 'Settings', 
      // link commented out as in the provided code
      // link: '/GradWise/settings',
      color: 'text-gray-600'
    },
    { 
      icon: <LogOut size={18} />, 
      label: 'Logout', 
      onClick: handleSubmit,
      color: 'text-red-600',
      divider: true
    }
  ];

  // Extract the first letter of name for the avatar
  const userInitial = studentData?.name ? studentData.name.charAt(0) : "U";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown trigger button */}
      <button 
        onClick={toggleDropdown}
        className="flex items-center space-x-2 bg-white rounded-full px-3 py-1.5 shadow-sm hover:shadow-md transition-all border border-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        disabled={isLoading}
      >
        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
          <span className="font-medium text-white">{userInitial}</span>
        </div>
        <div className="text-left">
          <p className="text-sm font-medium line-clamp-1">{studentData?.name || "User"}</p>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-1 z-50 border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">Signed in as</p>
            <p className="text-sm text-gray-500 truncate">{studentData?.email || "user@example.com"}</p>
          </div>
          
          <nav className="py-2">
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.divider && <hr className="my-2 border-gray-100" />}
                {item.link ? (
                  <Link 
                    to={item.link}
                    data-item={item.label}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                  >
                    <span className={`mr-4 ${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    data-item={item.label}
                    className="w-full text-left flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                    disabled={isLoading && item.label === 'Logout'}
                  >
                    <span className={`mr-4 ${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</span>
                    <span className="font-medium">{item.label === 'Logout' && isLoading ? 'Logging out...' : item.label}</span>
                  </button>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default DropDownNav;