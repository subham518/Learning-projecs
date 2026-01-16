# from flask import Flask, request, jsonify

# app = Flask(__name__)

# @app.route("/ask", methods = ["POST"])
# def ask():
#     data = request.get_json()
#     return jsonify({
#          "answer": "Flask API is working"
#     })

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from processing.loader import load_documents
from processing.chunker import chunk_text
from processing.embedder import embed_texts
from rag.retriever import retrieve
from rag.generator import generate_answer

app = Flask(__name__)
CORS(app)

# @app.route("/test", methods=["GET"])
# def test_loader():
#     docs = load_documents()
#     return {
#         "count": len(docs),
#         "sources": [doc["source"] for doc in docs]
#     }

# @app.route("/test-chunks", methods=["GET"])
# def test_chunks():
#     docs = load_documents()
#     first_doc = docs[0]

#     chunks = chunk_text(first_doc["text"])

#     return {
#         "total_chunks": len(chunks),
#         "sample_chunk": chunks[0]
#     }

# @app.route("/test-embeddings", methods=["GET"])
# def test_embeddings():
#     docs = load_documents()
#     chunks = chunk_text(docs[0]["text"])
#     embeddings = embed_texts(chunks)
    
#     return {
#          "total_chunks": len(chunks),
#         "embedding_dimensions": len(embeddings[0])
#     }

# @app.route("/test-retrieve", methods=["GET"])
# def test_retrieve():
#     query = "sacred forest folklore"
#     results = retrieve(query)

#     return {
#         "query": query,
#         "results": results
#     }

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    query = data.get("query")

    chunks = retrieve(query)
    answer = generate_answer(chunks, query)

    return jsonify({
        "query": query,
        "answer": answer
    })

if __name__ == "__main__":
    app.run(debug=True)

