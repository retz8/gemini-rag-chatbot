import { embed } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_GENERATIVE_AI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY as string;

const genAI = new GoogleGenerativeAI(GOOGLE_GENERATIVE_AI_API_KEY);

export async function getEmbeddings(input: string) {
  try {
    // const response = await genai.createEmbedding({
    //   model: "text-embedding-ada-002",
    //   input: input.replace(/\n/g, ' ')
    // })

    const model = genAI.getGenerativeModel({ model: "text-embedding-004" })

    const result = await model.embedContent(input.replace(/\n/g, ' '))
    console.log(result.embedding.values);
    return result.embedding;

  } catch (e) {
    console.log("Error calling OpenAI embedding API: ", e);
    throw new Error(`Error calling OpenAI embedding API: ${e}`);
  }
}