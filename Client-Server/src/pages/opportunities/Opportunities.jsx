import React from 'react';
import Hackathons from '../../components/auth/opportunities/Hackathons';
import Internships from '../../components/auth/opportunities/Internships';

const Opportunities = () => {
  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Opportunities</h1>
         {/* chatbot */}
         <img
         onClick={()=>{Navigate("/GradWise/OpenAI-Help")}}
         src="../../../public/Chatbot.png"
         alt="Chatbot"
         className="fixed bottom-6 right-6 w-30 h-30 cursor-pointer hover:scale-105 transition-transform z-50"
        />
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
    </div>
  );
};

export default Opportunities;
