import axios from 'axios';

export class eventService {
  async getEvents() {
    try {
      const response = await axios.post("http://localhost:3000/events/hackathons", {
        withCredentials: true
      });

      if (response) {
        console.log("Events fetched:", response);
        return response;
      }
    } catch (error) {
      console.error("backend service error fetching events failed", error);
    }
  }
}

export default eventService;
