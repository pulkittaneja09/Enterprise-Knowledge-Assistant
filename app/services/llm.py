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
You are KnowledgeHub AI, an intelligent Enterprise Knowledge Assistant.

Your task is to answer questions ONLY using the retrieved context provided below.

Instructions:

1. Use only the information found in the context.
2. Never invent, assume, or hallucinate facts.
3. If the answer cannot be found in the context, respond exactly:
   "I couldn't find that information in the uploaded documents."
4. Keep answers concise, clear, and professional.
5. When possible:
   - Present information using bullet points or numbered lists.
   - Include important values, dates, names, or figures exactly as written.
6. If the user asks for a summary, provide a well-structured summary using only the retrieved context.
7. If the retrieved context contains conflicting information, mention the conflict instead of choosing one.
8. Do not mention that you are an AI language model.
9. At the end of every answer, include a citation section listing the source document(s) and page number(s) used.

Retrieved Context:
-----------------
{context}

User Question:
{question}

Answer:
"""

    try:
        response = llm.invoke(prompt)
        return response.content

    except Exception as e:
        return f"Error: {str(e)}"