import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-yellow-300">G</span>rad
            <span className="text-yellow-300">W</span>ise
          </h1>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive 
                      ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300 pb-1' 
                      : 'hover:text-yellow-200 transition-colors duration-200'
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive 
                      ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300 pb-1' 
                      : 'hover:text-yellow-200 transition-colors duration-200'
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive 
                      ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300 pb-1' 
                      : 'hover:text-yellow-200 transition-colors duration-200'
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive 
                      ? 'bg-yellow-500 text-blue-800 px-4 py-2 rounded-lg font-medium' 
                      : 'bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200'
                  }
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <ul className="flex flex-col space-y-3">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive 
                      ? 'text-yellow-300 font-semibold block py-2' 
                      : 'hover:text-yellow-200 block py-2 transition-colors duration-200'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive 
                      ? 'text-yellow-300 font-semibold block py-2' 
                      : 'hover:text-yellow-200 block py-2 transition-colors duration-200'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive 
                      ? 'text-yellow-300 font-semibold block py-2' 
                      : 'hover:text-yellow-200 block py-2 transition-colors duration-200'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive 
                      ? 'bg-yellow-500 text-blue-800 px-4 py-2 rounded-lg font-medium block text-center' 
                      : 'bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg block text-center transition-colors duration-200'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;