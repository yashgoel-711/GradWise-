import axios from "axios";

const OPENROUTER_API_KEY = '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'; // Replace with your OpenRouter API key
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';


const AiReq = async (prompt)=>{
    try {
        const response = await axios.post(
          OPENROUTER_API_URL,
          {
            model: 'google/gemma-3-4b-it:free', 

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
export {AiReq}