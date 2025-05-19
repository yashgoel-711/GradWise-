import axios from "axios";


const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = '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'


const Ainvidia = async (prompt) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional
        // "X-Title": "<YOUR_SITE_NAME>",     // Optional
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

    console.log(typeof data); // should log "object"
    console.log(data.choices[0].message.content); // access the response content
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return null;
  }
};
// const Ainvidia = async (prompt) => {
//   // console.log(prompt)
//   try {
//     // console.log(OPENROUTER_API_KEY)
//     const response = await fetch(`${OPENROUTER_API_URL}`, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${OPENROUTER_API_KEY} `,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         model: "google/gemma-2-9b-it:free",
//         messages: [
//           {
//             role: "user",
//             content: prompt
//           }
//         ]
//       })
//     });
//     console.log("response", response)

//     const generatedText = response.data?.text;

//     if (!generatedText) {
//       throw new Error("No text returned from GPT-2 API");
//     }

//     return generatedText;
//   } catch (error) {
//     console.error("Error communicating with GPT-2 API:", error.message);
//     throw {
//       statusCode: 500,
//       success: false,
//       errors: [error.message],
//       data: null
//     };
//   }
// };

export { Ainvidia };