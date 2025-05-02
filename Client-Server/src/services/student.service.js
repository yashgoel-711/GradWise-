import axios from 'axios'
import {BackendURL} from "../config/config.js"
export class StudentService{
   

    
    async createAccount(data){
        try {
            // console.log(import.meta)
            
            // console.log(data);  
            const response = await axios.post(`${BackendURL}/student/register-Student`, data );  
            console.log(response)
            await this.login(data)
            return response;
        } catch (error) {
            console.error('backend service error student registration failed :: ', error)
        }
    }

    async login(data){
        try {
            const response = await axios.post(`${BackendURL}/student/login-Student`, data ,{ withCredentials: true }); 
            console.log(response)                     
            return response;
        } catch (error) {
            console.error('backend service error student login failed :: ', error.message)
        }
    }

    async logout(){
        try {
            const response = await axios.post(`${BackendURL}/student/logout-Student`,{},{ withCredentials: true });
            if(response){
                return response;
            }
        } catch (error) {
            console.error("backend service error student logout failed",error)
        }
    }
    async AiData(data){
        try {
            const response = await axios.post(`${BackendURL}/ai/api/test/`,data,{ withCredentials: true });
            if(response){
                return response;
            }
        } catch (error) {
            console.error("backend service error student AiData failed",error)
        }
    }
    async updateSkills(data){
        try {
            const response = await axios.post(`${BackendURL}/student/update-skills`,data,{ withCredentials: true });
            if(response){
                return response;
            }
        } catch (error) {
            console.error("backend service error student skills update failed",error)
            
        }
    }
    async updateAvatar(avatarData){
        try {
           const response =  await axios.post("", avatarData , {withCredentials : true})
           return response.data;
        } catch (error) {
            console.error("backend service error student avatar update failed",error)
        }
    }

}

const studentService = new StudentService();

export default studentService