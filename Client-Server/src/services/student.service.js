import axios from 'axios'

export class StudentService{
   

    
    async createAccount(data){
        try {
            // console.log(data);  
            const response = await axios.post("http://localhost:3000/student/register-Student", data );  
            console.log(response)
            await this.login(data)
            return response;
        } catch (error) {
            console.error('backend service error student registration failed :: ', error)
        }
    }

    async login(data){
        
        try {
            const response = await axios.post("http://localhost:3000/student/login-Student", data ,{ withCredentials: true });                      
            return response;
        } catch (error) {
            console.error('backend service error student login failed :: ', error)
        }
    }

    async logout(){
        try {
            const response = await axios.post("http://localhost:3000/student/logout-Student",{},{ withCredentials: true });
            if(response){
                return response;
            }
        } catch (error) {
            console.error("backend service error student logout failed",error)
        }
    }

}

const studentService = new StudentService();

export default studentService