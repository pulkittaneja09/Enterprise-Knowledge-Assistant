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
# 🧠 RAG Pipeline

```
PDF Upload
    │
    ▼
Text Extraction
    │
    ▼
Document Chunking
    │
    ▼
Embedding Generation
    │
    ▼
ChromaDB Vector Store
    │
    ▼
User Question
    │
    ▼
Semantic Similarity Search
    │
    ▼
Relevant Context Retrieval
    │
    ▼
Google Gemini
    │
    ▼
Context-Aware Response
```

---

# 🛠️ Tech Stack

## 🤖 Generative AI

- Google Gemini 2.5 Flash
- LangChain
- Retrieval-Augmented Generation (RAG)
- Google Embeddings
- ChromaDB

## ⚙️ Backend

- Python
- FastAPI
- Uvicorn
- REST APIs

## 🎨 Frontend

- React
- Vite
- Axios

## 📦 Vector Database

- ChromaDB

## ☁️ Deployment

- Render
- Vercel

---
# 📂 Project Structure

```
Enterprise-Knowledge-Assistant
│
├── app/
│   ├── api/
│   ├── services/
│   ├── models/
│   ├── utils/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── chroma_db/
├── uploads/
├── requirements.txt
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/pulkittaneja09/Enterprise-Knowledge-Assistant.git

cd Enterprise-Knowledge-Assistant
```

## Install Backend

```bash
pip install -r requirements.txt
```

## Configure Environment Variables

Create a `.env` file in the project root.

```env
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
```

## Start Backend

```bash
uvicorn app.main:app --reload
```

## Start Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🌍 Live Demo

### Frontend

👉 https://knowledgehub-ai-pulkit.vercel.app/

### Backend API

👉 https://enterprise-knowledge-assistant-tyj7.onrender.com/

---
# 🎯 Future Improvements

- Multi-document conversations
- Chat history
- OCR support for scanned PDFs
- Streaming AI responses
- Hybrid keyword + semantic search
- Reranking pipeline
- Authentication & user management
- Cloud-hosted vector database

---
## 📬 Connect with Me

🌐 **Portfolio:** https://portfolio-website-pi-blush-92.vercel.app/

💼 **LinkedIn:** https://www.linkedin.com/in/pulkit-taneja-627437366/

💻 **GitHub:** https://github.com/pulkittaneja09