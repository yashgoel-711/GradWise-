import axios from "axios";

export class ResumeService {
  async downloadResume() {
    try {
      const response = await axios.post("http://localhost:3000/api/resume", {
        withCredentials: true,
        responseType: "blob", // important for file download
      });

      // Create a URL from the response blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Resume.pdf"); // filename
      document.body.appendChild(link);
      link.click();
      link.remove();

      return true;
    } catch (error) {
      console.error("Failed to download resume:", error);
      return false;
    }
  }
}

export default ResumeService;
