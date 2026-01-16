import faiss
import pickle
import os
import sys
from sentence_transformers import SentenceTransformer

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

INDEX_PATH = "vector_store/faiss_index.bin"
METADATA_PATH = "vector_store/metadata.pkl"

# print("Loading FAISS index...")
index = faiss.read_index(INDEX_PATH)
# print("FAISS index loaded")

# print("Loading metadata...")
with open(METADATA_PATH, "rb") as f:
    metadata = pickle.load(f)
# print("Metadata loaded")

# print("Loading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")
# print("Embedding model loaded")

def retrieve(query, top_k=3):
    # print("User query:", query)

    query_embedding = model.encode([query])
    # print("Query embedded")

    distances, indices = index.search(query_embedding, top_k)
    # print("Retrieved indices:", indices)

    results = []
    for idx in indices[0]:
        results.append(metadata[idx]["text"])

    return results
