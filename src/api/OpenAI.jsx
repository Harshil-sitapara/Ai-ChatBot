import axios from "axios";
import { ApiKey } from "../Helper";

const client = axios.create({
  headers: {
    Authorization: "Bearer " + ApiKey,
    "content-Type": "application/json",
  },
});

const ChatGPTEndPoint = "https://api.openai.com/v1/chat/completions";
const DalleEndPoint = "https://api.openai.com/v1/images/generations";

export const apiCall = async (prompt) => {
  try {
    let generatedText = "";

    // Check if the prompt contains keywords that suggest image generation
    const shouldGenerateImage = /\b(image|generate|art)\b/i.test(prompt);

    if (shouldGenerateImage) {
      // Image generation using DALL·E
      const dalleRes = await client.post(DalleEndPoint, {
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024", 
      });

      console.log("DALL·E Response:", dalleRes.data);
      generatedText =dalleRes.data.data[0].url;
      console.log("generatedText image",generatedText)
      return { success: true, text: generatedText };
    } else {
      // Text generation using ChatGPT
      const chatRes = await client.post(ChatGPTEndPoint, {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      generatedText = chatRes.data.choices[0].message.content;
      
      console.log("ChatGPT Response:", chatRes.data);
      console.log("generatedText chat",generatedText)
      return { success: true, text: generatedText };
    }

   
  } catch (error) {
    console.log("error", error);
    return { success: false, msg: error.message };
  }
};
