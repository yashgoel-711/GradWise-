import axios from 'axios';
import {BackendURL} from '../config/config.js';         
class ProjectService{ 
    async createProject(data){
        try {
            const response = await axios.post(`${BackendURL}/student/projects/create-project`, data ,{ withCredentials: true });  
            return response;
        } catch (error) {
            console.error('backend service error project creation failed :: ', error)
        }
    }
    async getProjects(){
        try {
            const response = await axios.get(`${BackendURL}/student/projects/get-project`,{ withCredentials: true });  
            return response;
        } catch (error) {
            console.error('backend service error project get failed :: ', error)
        }
    }
}
const projectService = new ProjectService();    
export default projectService;