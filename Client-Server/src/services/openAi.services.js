import axios from 'axios'

export class openAiService{
    async AiMessage(data){
        try {
            const response = await axios.post(`${import.meta.env.BACKEND_URL}/ai/api/test2`,data,{ withCredentials: true });
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
            const response = await axios.post(`${import.meta.env.BACKEND_URL}/ai/api/test`,data,{ withCredentials: true });
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