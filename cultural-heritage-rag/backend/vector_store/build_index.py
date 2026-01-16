import faiss
import pickle
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from processing.loader import load_documents
from processing.chunker import chunk_text
from processing.embedder import embed_texts


# print("Loading documents...")
docs = load_documents()

all_chunks = []
metadata = []

for doc in docs:
    chunks = chunk_text(doc["text"])
    for chunk in chunks:
        all_chunks.append(chunk)
        metadata.append({
            "source": doc["source"],
            "text": chunk
        })

# print("Total chunks:", len(all_chunks))

# print("Creating embeddings...")
embeddings = embed_texts(all_chunks)

dimension = embeddings.shape[1]
# print("Embedding dimension:", dimension)

index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

# print("FAISS index size:", index.ntotal)

faiss.write_index(index, "vector_store/faiss_index.bin")

with open("vector_store/metadata.pkl", "wb") as f:
    pickle.dump(metadata, f)

# print("FAISS index and metadata saved successfully")


# --- INSTRUCTIONS FOR REBUILDING THE INDEX ---
# Any time you:
# Add new cultural text
# Change chunking logic

# You must re-run:
# python vector_store/build_index.py