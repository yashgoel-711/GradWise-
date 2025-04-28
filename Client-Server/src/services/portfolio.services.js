import axios from "axios";

const BASE_URL = `${import.meta.env.BACKEND_URL}/api/resume`;

class ResumeService {
  async getDownloadLink() {
    try {
      const response = await axios.post(
        `${BASE_URL}`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const downloadLink = response.data.downloadLink;
      if (downloadLink) {
        return `${import.meta.env.BACKEND_URL}${downloadLink}`; // make it full URL
      } else {
        throw new Error("Download link not found");
      }
    } catch (error) {
      console.error("Failed to fetch resume link:", error.response || error.message);
      return null;
    }
  }
}

export default ResumeService;
