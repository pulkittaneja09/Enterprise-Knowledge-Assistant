from fastapi import APIRouter

from app.services.retriever import retrieve_documents
from app.services.llm import generate_answer

router = APIRouter()


@router.post("/query")
def query_documents(question: str):

    results = retrieve_documents(question)

    answer = generate_answer(question, results)

    return {
        "question": question,
        "answer": answer,
        "sources": [
            doc.metadata
            for doc in results
        ]
    }