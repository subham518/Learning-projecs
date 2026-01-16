import openai
from rag.prompt import build_prompt

openai.api_key = "YOUR_API_KEY_HERE"

def generate_answer(context_chunks, query):
    prompt = build_prompt(context_chunks, query)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return response["choices"][0]["message"]["content"]



# use this code if you have openai api key.