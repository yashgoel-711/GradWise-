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
    async getSkills(){
        try {
            const response = await axios.get(`${BackendURL}/student/skills-student`,{ withCredentials: true });  
            return response;
        } catch (error) {
            console.error('backend service error student skills get failed :: ', error)
        }
    }
}
const skillsService = new SkillsService();
export default skillsService