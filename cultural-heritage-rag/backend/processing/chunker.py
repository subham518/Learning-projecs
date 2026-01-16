def chunk_text(text, chunk_size=300, overlap=50):
    chunks = []
    start = 0
    text_length = len(text)

    # print("Total text length:", text_length)
    # print("Chunk size:", chunk_size)
    # print("Overlap:", overlap)

    while start < text_length:
        end = start + chunk_size
        # print("Creating chunk from index", start, "to", end)

        chunk = text[start:end]
        chunks.append(chunk)

        start = end - overlap

    # print("Total chunks created:", len(chunks))
    return chunks
