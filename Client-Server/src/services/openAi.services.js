import axios from 'axios'

export class openAiService{
    
    async AiData(data){
        try {
            const response = await axios.post("http://localhost:3000/ai/api/test",data,{ withCredentials: true });
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