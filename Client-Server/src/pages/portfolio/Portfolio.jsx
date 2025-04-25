import React from "react";
import { Button } from "@/components/ui/button";
import ResumeService from "../../services/ResumeService";
import { useToast } from "@/components/ui/use-toast";

const Portfolio = () => {
  const { toast } = useToast();
  const resumeService = new ResumeService();

  const handleDownload = async () => {
    const success = await resumeService.downloadResume();
    if (success) {
      toast({ title: "Resume Downloaded" });
    } else {
      toast({ title: "Download Failed", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">My Portfolio</h1>
      <p className="text-lg mb-6">
        This section contains my professional resume, a showcase of my work,
        projects, and a summary of my technical skills.
      </p>
      <Button onClick={handleDownload}>Download Resume</Button>
    </div>
  );
};

export default Portfolio;

