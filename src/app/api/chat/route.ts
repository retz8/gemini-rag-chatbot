// chatbot main route
// using Gemini API with Vercel AI SDK (@ai-sdk/google)
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// [NOTE] below code is for creating model with custom settings
// import { createGoogleGenerativeAI } from '@ai-sdk/google';

// const google = createGoogleGenerativeAI({
//   // custom settings
// });

export async function POST(req: Request) {
  // 1. extract message from request body
  const { messages } = await req.json();

  const model = google("models/gemini-1.5-flash-latest");

  // 2. get response from Gemini API
  const result = await streamText({
    model,
    messages: messages,
    system:
      "You are a therapist and you are talking to a patient who is experiencing anxiety. You are trying to help them calm down. You can start by saying something like 'I'm here to help you. Let's take a deep breath together.'",
  });

  // 3. return as stream response
  return result.toAIStreamResponse();
}
