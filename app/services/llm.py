import os

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0.3,
)


def generate_answer(question, documents):

    context = "\n\n".join(
        [doc.page_content for doc in documents]
    )

    prompt = f"""
You are an Enterprise Knowledge Assistant.

You must answer ONLY using the information provided in the context below.

Rules:
- Do not make up information.
- If the answer is not found in the context, reply exactly:
"I couldn't find that information in the uploaded documents."
- Keep the answer clear and concise.
- If possible, mention which document the information came from.

Context:
{context}

Question:
{question}

Answer:
"""

    try:
        response = llm.invoke(prompt)
        return response.content

    except Exception as e:
        return f"Error: {str(e)}"