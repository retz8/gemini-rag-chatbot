# Upload PDF file as embedding to pinecone index
# using gemini's text-embedding-004 model

import os
import re
from dotenv import load_dotenv

from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import google.generativeai as genai

load_dotenv()
PINECONE_API_KEY = os.getenv('PINECONE_API')
PINECONE_INDEX_NAME = os.getenv('PINECONE_INDEX_NAME')

# Initialize Gemini
GOOGLE_API_KEY = os.getenv('GOOGLE_GENERATIVE_AI_API_KEY')
genai.configure(api_key = GOOGLE_API_KEY)

# Embedding model we are going to use
MODEL = "models/text-embedding-004"

# Initialize Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)

# Create the index if it doesn't exist
if PINECONE_INDEX_NAME not in pc.list_indexes():
    pc.create_index(PINECONE_INDEX_NAME, dimension=768, metric="cosine", spec=ServerlessSpec( cloud='aws', region='us-east-1'))

# Instantiate the index
index = pc.Index(PINECONE_INDEX_NAME)

# Define a function to preprocess text
def preprocess_text(text):
    # Replace consecutive spaces, newlines and tabs
    text = re.sub(r'\s+', ' ', text)
    return text

def process_pdf(file_path):
    # create a loader
    loader = PyPDFLoader(file_path)
    # load your data
    data = loader.load()
    # Split your data up into smaller documents with Chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    documents = text_splitter.split_documents(data)
    # Convert Document objects into strings
    texts = [str(doc) for doc in documents]
    # Preprocess the text
    texts = [preprocess_text(text) for text in texts]
    return texts

# Define a function to create embeddings
def create_embeddings(texts):
    embeddings_list = []
    for text in texts:
        # res = openai.Embedding.create(input=[text], engine=MODEL)
        res = genai.embed_content(model = MODEL, content = text)
        embeddings_list.append(res['embedding'])
    return embeddings_list

# Define a function to upsert embeddings to Pinecone
def upsert_embeddings_to_pinecone(index, embeddings, ids):
    index.upsert(vectors=[(id, embedding) for id, embedding in zip(ids, embeddings)])

if __name__ == "__main__":
    # Process a PDF and create embeddings
    file_path = "./data/common_questions_cbt.pdf"  # Replace with your actual file path
    texts = process_pdf(file_path)
    embeddings = create_embeddings(texts)
    # Upsert the embeddings to Pinecone
    upsert_embeddings_to_pinecone(index, embeddings, [file_path])