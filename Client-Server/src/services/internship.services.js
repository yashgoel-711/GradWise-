import axios from "axios";

export class InternshipService {
  // Function to fetch part-time internship data
  async getInternships() {
    try {
      const response = await axios.post(`https://gradwise.onrender.com/internship/list`, { withCredentials: true });
      if (response && response.data.success) {
        console.log("Internships fetched successfully:", response.data);
        return response.data.data;  // Returning the data from the response
      } else {
        console.error("Failed to fetch internships");
        return [];
      }
    } catch (error) {
      console.error("Error fetching internships:", error);
      return [];
    }
  }
}

export default new InternshipService(); // Export an instance for easy usage
