import { Outlet, useNavigate } from 'react-router'; 
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '../components/auth/index.js';

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true); // ✅ Fix 1
  const authStatus = useSelector((state) => state.trackAuth.status);
  const [studentData, setStudentData] = useState(null); // ✅ Fix 2

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
    return <h1 className="text-center text-2xl font-bold mt-10">Loading...</h1>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Navbar studentData={studentData} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isExpanded ? 'ml-64' : 'ml-20'
        } flex-1 overflow-auto`}
      >
        <div className="p-4">
          <Outlet context={{ studentData }} /> {/* ✅ Fix 3: pass with context */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;






  
