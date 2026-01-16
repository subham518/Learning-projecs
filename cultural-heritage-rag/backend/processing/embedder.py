from sentence_transformers import SentenceTransformer


# print("Loading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")
# print("Model loaded successfully")

def embed_texts(texts):
    # print("Number of texts to embed:", len(texts))
    embeddings = model.encode(texts)
    # print("Embedding shape:", embeddings.shape)
    return embeddings