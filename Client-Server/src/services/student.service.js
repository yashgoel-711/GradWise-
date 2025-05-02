import axios from 'axios'
import {BackendURL} from "../config/config.js"
export class StudentService{
   

    
    async createAccount(data){
        try {
            console.log(import.meta)
            
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
            console.error('backend service error student login failed :: ', error)
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

}

const studentService = new StudentService();

export default studentService