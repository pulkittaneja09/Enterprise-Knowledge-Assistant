from fastapi import FastAPI
from app.api.upload import router as upload_router

app = FastAPI(title="Enterprise Knowledge Assistant")

app.include_router(upload_router)


@app.get("/")
def home():
    return {"message": "Enterprise Knowledge Assistant API is Running"}