import axios from 'axios'
import {BackendURL} from '../config/config.js'
export class SkillsService{
    async updateSkills(data){
        try {
            console.log('data in skills service',data)
            const response = await axios.post(`${BackendURL}/student/skills-student`, data ,{ withCredentials: true });  
            return response;
        } catch (error) {
            console.error('backend service error student skills update failed :: ', error)
        }
    }
    async getSkills() {
        try {
            const response = await axios.post(
                `${BackendURL}/student/get-skills-student`, // URL
                {}, // No data needed in body
                {
                    withCredentials: true, // Send cookies (if using cookie-based auth)
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}`, // Uncomment if using JWT
                    },
                }
            );
            console.log('response in skills service', response);
            return response.data; // Or just return response depending on your need
        } catch (error) {
            console.error('backend service error student skills get failed :: ', error.response?.data || error.message);
        }
    }
    
}
const skillsService = new SkillsService();
export default skillsService