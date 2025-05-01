import axios from 'axios'
import {BackendURL} from '../config/config.js'
export class openAiService{
    async AiMessage(data){
        try {
            const response = await axios.post(`${BackendURL}/ai/api/test2`,data,{ withCredentials: true });
            if(response){
                console.log(response)
                return response;
            }
        } catch (error) {
            console.error("backend service error student AiMessage failed",error)
        }
    }
    async AiData(data){
        try {
            const response = await axios.post(`${BackendURL}/ai/api/test`,data,{ withCredentials: true });
            if(response){
                console.log(response)
                return response;
            }
        } catch (error) {
            console.error("backend service error student AiData failed",error)
        }
    }

}



export default openAiService