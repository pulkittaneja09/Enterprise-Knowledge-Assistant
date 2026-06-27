from langchain_chroma import Chroma

from app.services.embeddings import get_embedding_model


def create_vector_store(chunks):

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=get_embedding_model(),
        persist_directory="chroma_db"
    )

    return vector_store