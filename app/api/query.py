from fastapi import APIRouter

from app.services.retriever import retrieve_documents

router = APIRouter()


@router.post("/query")
def query_documents(question: str):

    results = retrieve_documents(question)

    response = []

    for doc in results:
        response.append({
            "content": doc.page_content,
            "metadata": doc.metadata
        })

    return {
        "question": question,
        "results": response
    }