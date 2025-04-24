import axios from "axios";


const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = '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';



const Ainvidia = async (prompt) => {
  try {
    // console.log(OPENROUTER_API_KEY)
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemma-2-9b-it:free",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    // console.log("Full API response:", data);

    if (!data?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response structure from OpenRouter AI");
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error("Error fetching AI response:", error.message);
    throw {
      statusCode: 408,
      success: false,
      errors: [error.message],
      data: null
    };
  }
};


export {Ainvidia}