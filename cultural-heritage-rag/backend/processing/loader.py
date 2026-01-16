import os

DATA_FOLDER = "data"

def load_documents():
    documents = []

    # print("Loading documents from:", DATA_FOLDER)

    for filename in os.listdir(DATA_FOLDER):
        # print("Found file:", filename)

        if filename.endswith(".txt"):
            file_path = os.path.join(DATA_FOLDER, filename)
            # print("Reading file:", file_path)

            with open(file_path, "r", encoding="utf-8") as f:
                text = f.read()
                # print("Characters loaded:", len(text))

                documents.append({
                    "source": filename,
                    "text": text
                })

    # print("Total documents loaded:", len(documents))
    return documents
