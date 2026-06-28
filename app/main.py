import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import router as upload_router
from app.api.query import router as query_router

os.makedirs("uploads", exist_ok=True)
os.makedirs("chroma_db", exist_ok=True)

app = FastAPI(title="Enterprise Knowledge Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # We'll restrict this to your frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(query_router)

@app.get("/")

def home():
    return {
        "product": "KnowledgeHub AI",
        "description": "Enterprise Document Intelligence powered by Retrieval-Augmented Generation (RAG)",
        "version": "1.0.0",
        "status": "running"
    }