def build_prompt(context_chunks, query):
    context = "\n\n".join(context_chunks)

    prompt = f"""
You are a cultural heritage assistant.
Answer the question using ONLY the context below.
If the answer is not in the context, say you do not know.

Context:
{context}

Question:
{query}

Answer:
"""
    return prompt
