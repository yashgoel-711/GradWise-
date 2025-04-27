import React from "react";
import ResumeService from "../../services/portfolio.services.js";
import ChatBot from "../../components/chatbot/ChatBot.jsx"
import { useNavigate } from 'react-router'
const Portfolio = () => {
  const resumeService = new ResumeService();

  const Navigate = useNavigate()
  const handleDownload = async () => {
   
    const downloadUrl = await resumeService.getDownloadLink();
    if (downloadUrl) {
      // alert("Resume Downloaded");
      // alert("Resume Downloaded");
      window.open(downloadUrl, "_blank");
      
    } else {
      alert("Download Failed");
      alert("Download Failed");
    }
  };

  return (
    
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2.5rem 1rem" }}>
      <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem" }}>
        My Portfolio
      </h1>
      
      <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>
        This section contains my professional resume, a showcase of my work,
        projects, and a summary of my technical skills.
      </p>
      <button onClick={handleDownload}>Download Resume</button>
      {/* chatbot */}
      <ChatBot />
    </div>
  );
};

export default Portfolio;
