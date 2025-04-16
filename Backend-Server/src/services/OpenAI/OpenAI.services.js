import axios from "axios";

const OPENROUTER_API_KEY = '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'; // Replace with your OpenRouter API key
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';


const AiReq = async (prompt)=>{
    try {
        const response = await axios.post(
          OPENROUTER_API_URL,
          {
            model: 'openai/gpt-3.5-turbo', 

            messages: [
              { role: 'user',
                 content: prompt 
                }
            ],
          },
          {
            headers: {
              'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
    
        return response.data.choices[0].message.content;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }

}
export default AiReq