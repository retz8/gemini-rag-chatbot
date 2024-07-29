import { getEmbeddings } from "./lib/rag/getEmbeddings";

const text = "The quick brown fox jumps over the lazy dog."

// Get the embeddings of the input message
const embedding = await getEmbeddings(text);
