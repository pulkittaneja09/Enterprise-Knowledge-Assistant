import os
from app.services.text_splitter import split_documents
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.pdf_loader import load_pdf
router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    documents = load_pdf(file_path)
    chunks = split_documents(documents)

    print(f"Total Chunks : {len(chunks)}")

    print("\nFirst Chunk:\n")
    print(chunks[0].page_content)

    print("\nMetadata:")
    print(chunks[0].metadata)
    print(f"Pages Loaded: {len(documents)}")
    print(documents[0].page_content[:500])

    return {
    "success": True,
    "filename": file.filename,
    "pages": len(documents),
    "chunks": len(chunks),
    "message": "PDF uploaded and processed successfully."
}