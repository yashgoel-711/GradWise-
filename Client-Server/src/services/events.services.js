import axios from 'axios';
import {BackendURL} from '../config/config.js'
export class eventService {
  async getEvents() {
    try {
      const response = await axios.post(`${BackendURL}/events/hackathons`, {
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
