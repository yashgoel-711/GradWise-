import React from 'react';
import Hackathons from '../../components/auth/opportunities/Hackathons';
import Internships from '../../components/auth/opportunities/Internships';
import { useNavigate } from 'react-router'
import ChatBot from "../../components/chatbot/ChatBot"
const Opportunities = () => {
  const Navigate = useNavigate()
  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Opportunities</h1>
         
         
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Hackathons</h2>
          <Hackathons />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Internships</h2>
          <Internships />
        </div>
      </div>

    <ChatBot />

    </div>
  );
};

export default Opportunities;
