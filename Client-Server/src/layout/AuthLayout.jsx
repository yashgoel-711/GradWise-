import {Navbar} from '../components/auth/index.js' // your sidebar



import React, { useState } from 'react';

import { Outlet } from 'react-router';

const AuthLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isExpanded ? 'ml-64' : 'ml-20'
        } flex-1 overflow-auto`}
      >
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
