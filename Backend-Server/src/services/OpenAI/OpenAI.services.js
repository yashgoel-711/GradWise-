import axios from "axios";

const LOCAL_GPT2_API_URL = "http://localhost:5000/generate"; // Your local Flask/FastAPI endpoint

const Aigpt2 = async (prompt) => {
  try {
    const response = await axios.post(LOCAL_GPT2_API_URL, {
      prompt: prompt,
      max_length: 100,   // optional: adjust based on your model config
      temperature: 0.7   // optional
    });

    const generatedText = response.data?.text;

    if (!generatedText) {
      throw new Error("No text returned from GPT-2 API");
    }

    return generatedText;
  } catch (error) {
    console.error("Error communicating with GPT-2 API:", error.message);
    throw {
      statusCode: 500,
      success: false,
      errors: [error.message],
      data: null
    };
  }
};

export { Aigpt2 };
