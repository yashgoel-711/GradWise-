import { Outlet, useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '../components/auth/index.js';
import Loader from '../components/loader/Loader.jsx';

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const authStatus = useSelector((state) => state.trackAuth.status);
  
  // Get isExpanded from Redux store
  const isExpanded = useSelector((state) => state.navbar.isExpanded);

  useEffect(() => {
    const storedData = localStorage.getItem("studentData");
    
    if (!storedData) {
      navigate("/login");
    } else {
      setStudentData(JSON.parse(storedData));
      setLoader(false);
    }
  }, [navigate, authStatus]);

  if (loader) {
    return <h1 className="text-center text-2xl font-bold mt-10"><Loader /></h1>;
  }

  return (
    <div className="flex flex-row h-screen bg-gray-100">
      {/* Sidebar wrapper with fixed positioning */}
      <div className="fixed h-full z-10">
        <Navbar studentData={studentData} />
      </div>

      {/* Main content - with dynamic left padding */}
      <div 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded ? 'pl-64' : 'pl-20'
        }`}
      >
        <div className="p-4 h-full overflow-auto">
          <Outlet context={{ studentData }} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;