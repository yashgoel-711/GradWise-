import axios from "axios";

const BASE_URL = "http://localhost:3000/api/resume"; // Update this if your backend runs on a different URL

class ResumeService {
  async downloadResume() {
    try {
      // Get token from localStorage
     
      // Make request with Authorization header
      const response = await axios.post(
        `${BASE_URL}`,
        {}, // Request body goes here, empty object if no data is being sent
        {
          withCredentials: true,
          responseType: 'blob', // correct placement
          headers: {
            'Content-Type': 'application/json'
          
          },
        }
      );

      // Handle file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      console.log(link)
      link.click();
      link.remove();

      return true;
    } catch (error) {
      console.error("Download failed:", error.response || error.message);
      return false;
    }
  }
}

export default ResumeService;
