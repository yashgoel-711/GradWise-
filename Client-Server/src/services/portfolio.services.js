
import axios from "axios";
import {BackendURL} from "../config/config.js"

class ResumeService {
  async getDownloadLink() {
    try {
      const response = await axios.post(
        `${BackendURL}`,
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
        return `${BackendURL}${downloadLink}`; // make it full URL
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
