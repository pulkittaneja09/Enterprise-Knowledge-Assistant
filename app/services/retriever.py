
from langchain_chroma import Chroma

from app.services.embeddings import get_embedding_model


PERSIST_DIRECTORY = "chroma_db"


def retrieve_documents(query: str, k: int = 3):
    """
    Retrieve the top-k most relevant document chunks
    from the vector database.
    """

    vector_store = Chroma(
        persist_directory=PERSIST_DIRECTORY,
        embedding_function=get_embedding_model()
    )

    results = vector_store.similarity_search(query, k=k)

    return results