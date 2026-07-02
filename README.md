# 🚀 KnowledgeHub AI

> **AI-powered Enterprise Document Intelligence Platform built using Retrieval-Augmented Generation (RAG), Google Gemini, LangChain, and ChromaDB.**

KnowledgeHub AI enables organizations to upload enterprise PDF documents and interact with them using natural language. By combining semantic retrieval with Google's Gemini LLM, the system generates accurate, grounded responses with document citations, significantly reducing hallucinations compared to traditional LLM-based chatbots.

---

# ✨ Key Features

- 🤖 AI-powered document question answering
- 📄 Upload and index enterprise PDF documents
- 🔍 Semantic search using vector embeddings
- 🧠 Retrieval-Augmented Generation (RAG)
- 📚 Context-aware responses with source citations
- ⚡ Google Gemini 2.5 Flash integration
- 📦 ChromaDB vector database for similarity search
- 🔗 End-to-end document ingestion pipeline
- 🚀 FastAPI REST API backend
- 🎨 Modern React + Vite frontend
- ☁️ Production deployment using Render & Vercel

---

# 🏗️ System Architecture

```
                User
                  │
                  ▼
        React + Vite Frontend
                  │
                  ▼
            FastAPI Backend
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
   PDF Processing      User Query
        │                   │
        ▼                   ▼
 Document Chunking   Query Embedding
        │                   │
        ▼                   ▼
 Google Embeddings   ChromaDB Search
        │                   │
        └─────────┬─────────┘
                  ▼
         Relevant Context
                  │
                  ▼
      Google Gemini 2.5 Flash
                  │
                  ▼
      Grounded AI Response
```

---
