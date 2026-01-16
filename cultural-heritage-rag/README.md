# Day 1

## Project Setup

1. Create a virtual environment: `python -m venv venv_name`
2. Activate the virtual environment: `venv_name\Scripts\activate`
3. Ensure `requirements.txt` contains: `flask` as backend/requirement.txt
4. Install dependencies: `pip install -r requirements.txt`
5. Create backend/app.py and run the application: `python app.py`

# Day 2

## API Implementation

The `app.py` file contains a Flask application with the following features:
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/ask", methods = ["POST"])
def ask():
    data = request.get_json()
    return jsonify({
         "answer": "Flask API is working"
    })

if __name__ == "__main__":
    app.run(debug=True)

```

- A POST endpoint at `/ask` that accepts JSON data and returns a JSON response.

### Testing the API

After running the application with `python app.py`, you can test the API

Expected response:
```json
{
  "answer": "Flask API is working"
}
```

# Day 3

## Data Loading Implementation

### Folder Structure Updates

- `data/`: New folder containing text documents (e.g., `folklore.txt`) with content to be processed.
- `processing/`: New folder containing `loader.py` module for data processing.

### Code Changes

- `processing/loader.py`: Implements `load_documents()` function that reads all `.txt` files from the `data` folder and returns a list of documents with source and text.

- `app.py`: Updated to import `load_documents` and added a new GET endpoint `/test` that returns the count of loaded documents and their sources.

### Testing the Data Loader

Run the application with `python app.py` and visit `http://localhost:5000/test` to see the loaded documents information.

Expected response:
```json
{
  "count": 1,
  "sources": ["folklore.txt"]
}
```

# Day 4

## Text Chunking Implementation

### New Module

- `processing/chunker.py`: Added `chunk_text()` function that splits text into smaller chunks with configurable size and overlap for better processing.

### Code Changes

- `app.py`: Updated to import `chunk_text` and added a new GET endpoint `/test-chunks` that loads documents, chunks the first document's text, and returns the total number of chunks and a sample chunk.

### Testing the Text Chunker

Run the application with `python app.py` and visit `http://localhost:5000/test-chunks` to see the chunking results.

Expected response:
```json
{
  "total_chunks": 2,
  "sample_chunk": "The village elders of Odisha speak of an ancient forest believed to be protected by spirits.\nIt is said that travelers who enter the forest with pure intentions are guided safely.\nLocal folklore tells of a hidden shrine built by unknown tribes centuries ago.\nDuring festivals, villagers offer prayers to honor the guardians of the land."
}
```

# Day 5

## Text Embeddings Implementation

### Dependencies Update

Update `requirements.txt` to include:
```
sentence-transformers
```

Install with: `pip install -r requirements.txt`

### New Module

- `processing/embedder.py`: Added `embed_texts()` function that uses SentenceTransformer model ("all-MiniLM-L6-v2") to generate embeddings for text chunks.

### Code Changes

- `app.py`: Updated to import `embed_texts` and added a new GET endpoint `/test-embeddings` that loads documents, chunks the first document's text, generates embeddings, and returns the total number of chunks and embedding dimensions.

### Testing the Embeddings

Run the application with `python app.py` and visit `http://localhost:5000/test-embeddings` to see the embedding results.

Expected response:
```json
{
  "total_chunks": 2,
  "embedding_dimensions": 384
}
```

# Day 6

## Vector Store Implementation

### Dependencies Update

Update `requirements.txt` to include:
```
faiss-cpu
```

Install with: `pip install -r requirements.txt`

### New Folder and Script

- `vector_store/`: New folder for vector database components.
- `vector_store/build_index.py`: Script that builds a FAISS index from the document chunks and their embeddings.

### Process Overview

The `build_index.py` script:
1. Loads all documents from the `data/` folder
2. Chunks each document's text
3. Generates embeddings for all chunks
4. Creates a FAISS L2 index
5. Saves the index to `vector_store/faiss_index.bin`
6. Saves metadata (source and text) to `vector_store/metadata.pkl`

### Building the Index

Run the build script:
```
python vector_store/build_index.py
```

Expected output:
```
Loading documents...
Total chunks: 2
Creating embeddings...
Embedding dimension: 384
FAISS index size: 2
FAISS index and metadata saved successfully
```

### Files Generated

After running the script, the `vector_store/` folder will contain:
- `faiss_index.bin`: The FAISS vector index
- `metadata.pkl`: Pickled metadata for each chunk

# Day 7

## Retrieval Implementation

### New Folder and Module

- `rag/`: New folder for Retrieval-Augmented Generation components.
- `rag/retriever.py`: Module that implements the `retrieve()` function for semantic search over the vector store.

### Functionality

The `retriever.py` module:
1. Loads the pre-built FAISS index from `vector_store/faiss_index.bin`
2. Loads metadata from `vector_store/metadata.pkl`
3. Loads the SentenceTransformer model for query embedding
4. Provides a `retrieve()` function that takes a query string and returns the top-k most relevant text chunks

### Code Changes

- `app.py`: Updated to import `retrieve` from `rag.retriever` and added a new GET endpoint `/test-retrieve` that tests retrieval with a sample query.

### Testing the Retrieval

Run the application with `python app.py` and visit `http://localhost:5000/test-retrieve` to test the retrieval functionality.

Expected response:
```json
{
  "query": "sacred forest folklore",
  "results": [
    "The village elders of Odisha speak of an ancient forest believed to be protected by spirits.\nIt is said that travelers who enter the forest with pure intentions are guided safely.\nLocal folklore tells of a hidden shrine built by unknown tribes centuries ago.\nDuring festivals, villagers offer prayers to honor the guardians of the land.",
    "Stories passed orally describe how the forest once saved the village from a great drought.\nElders believe the spirits still watch over the people and the forest remains sacred."
  ]
}
``` 

# Day 8

## Answer Generation Implementation

### Dependencies Update

Update `requirements.txt` to include:
```
openai
```

Install with: `pip install -r requirements.txt`

### New Modules

- `rag/generator.py`: Module that implements the `generate_answer()` function using OpenAI's GPT-3.5-turbo model. Takes context chunks and a query, generates a contextual answer.

- `rag/prompt.py`: Module that implements the `build_prompt()` function to construct prompts for the LLM with context and query.

### Setup

Before using the generator, set your OpenAI API key in `rag/generator.py`:
```python
openai.api_key = "YOUR_API_KEY_HERE"
```

### Code Changes

- `app.py`: Implemented the main `/ask` POST endpoint that:
  1. Accepts a JSON request with a "query" field
  2. Retrieves relevant context chunks using the retriever
  3. Generates an answer using the retrieved context and the LLM
  4. Returns both the query and generated answer

### Testing the Complete RAG System

Send a POST request to `http://localhost:5000/ask` with:
```json
{
  "query": "What does the folklore say about the forest?"
}
```

Expected response:
```json
{
  "query": "What does the folklore say about the forest?",
  "answer": "According to the folklore, the forest is believed to be protected by spirits and is considered sacred. The village elders speak of an ancient forest where travelers with pure intentions are guided safely. Local folklore tells of a hidden shrine built by unknown tribes centuries ago. The forest is said to have even saved the village from a great drought. The elders believe the spirits still watch over the people, making the forest a sacred place."
}
```

# Day 9

## Backend RAG System Summary

Complete Retrieval-Augmented Generation (RAG) system:
- Document loading and text chunking
- Vector embeddings using SentenceTransformer
- FAISS vector database for semantic search
- OpenAI GPT-3.5-turbo for answer generation
- Flask REST API endpoint `/ask` for querying

# Day 10

## Frontend Implementation

React + Vite application with three components:
- `QueryInput.jsx`: User query input field
- `Results.jsx`: Display retrieved results
- `Home.jsx`: Main page with state management

**Run Frontend:**
```bash
cd frontend && npm install && npm run dev
```

# Day 11

## Frontend-Backend Integration

Connected frontend with backend API:
- `api/askApi.js`: API module for POST requests to backend `/ask` endpoint
- `Home.jsx`: Updated with `askBackend()` function call and error handling
- Sends user queries to backend and displays retrieved context

**Setup:**
- Backend must be running on `http://127.0.0.1:5000`
- Frontend fetches results and displays them in the Results component
- Error handling implemented for failed requests

# Day 12

## Frontend UI Enhancements

Improved user experience with:
- **Loading State**: Display "Loading..." while fetching from backend
- **Error Handling**: Show error messages when queries fail or input is empty
- **Input Validation**: Check if query is not empty before sending
- **Results Display**: Better empty state handling with "No relevant information found" message
- **Conditional Rendering**: Smart display of loading, error, and results based on state

# Day 13

## Frontend Styling

Added comprehensive CSS styling (`styles.css`):
- **Layout**: Container with max-width for centered, responsive design
- **Colors**: Clean white background with error (red) and loading (gray) states
- **Components**: Styled input field, button, and result list
- **Spacing**: Proper padding, margins, and border-radius for modern look
- **Typography**: Arial font family for consistency
- **Interactive**: Cursor pointer on buttons for better UX

---

## Project Summary

### Overview

This project implements a **Cultural Heritage Assistant**—a full-stack web application that leverages Retrieval-Augmented Generation (RAG) to provide intelligent, context-aware answers about cultural heritage and folklore.

### Architecture

**Backend (Flask + Python)**
- RESTful API with `/ask` endpoint for query processing
- Complete RAG pipeline integrating:
  - Document loading and text chunking
  - Vector embeddings via SentenceTransformer
  - FAISS vector database for semantic search
  - OpenAI GPT-3.5-turbo for answer generation
- Modular design with separate processing, vector store, and RAG components

**Frontend (React + Vite)**
- Modern React application with component-based architecture
- QueryInput, Results, and Home components
- API integration for seamless backend communication
- Comprehensive error handling and loading states
- Responsive design with CSS styling

### Key Features

✓ Semantic search over cultural heritage documents  
✓ Context-aware answer generation using LLMs  
✓ Real-time query processing with loading indicators  
✓ Error handling and input validation  
✓ Clean, intuitive user interface  
✓ Modular and maintainable codebase  

### Technology Stack

**Backend**: Flask, SentenceTransformer, FAISS, OpenAI API  
**Frontend**: React 19, Vite, Axios  
**Database**: FAISS Vector Store  

### Getting Started

1. **Backend**: `cd backend && python app.py`
2. **Frontend**: `cd frontend && npm run dev`
3. **Access**: Open browser to `http://localhost:5173`

### Future Enhancements

- Add support for multiple document sources
- Implement caching for improved performance
- Add user authentication and query history
- Deploy to cloud infrastructure
- Integrate additional LLM models
- Add multilingual support

