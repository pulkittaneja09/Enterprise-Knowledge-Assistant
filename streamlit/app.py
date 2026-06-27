import streamlit as st
import requests

st.set_page_config(
    page_title="KnowledgeHub AI",
    page_icon="📘",
    layout="wide"
)

st.title("📘 KnowledgeHub AI")
st.caption("Enterprise Knowledge Assistant using RAG + Gemini")

# ---------------- Sidebar ---------------- #

with st.sidebar:

    st.header("📂 Upload Documents")

    uploaded_file = st.file_uploader(
        "Choose a PDF",
        type=["pdf"]
    )

    upload_button = st.button("Upload")

    if upload_button:

        if uploaded_file is None:
            st.warning("Please select a PDF first.")

        else:

            files = {
                "file": (
                    uploaded_file.name,
                    uploaded_file.getvalue(),
                    "application/pdf"
                )
            }

            response = requests.post(
                "http://127.0.0.1:8000/upload",
                files=files
            )

            if response.status_code == 200:
                st.success(response.json()["message"])
            else:
                st.error("Upload failed.")

# ---------------- Main Page ---------------- #

st.header("💬 Ask Questions")

question = st.text_input(
    "Ask anything about your uploaded document"
)

ask_button = st.button("Ask")

if ask_button:

    if question.strip() == "":
        st.warning("Please enter a question.")

    else:

        with st.spinner("Thinking..."):

            response = requests.post(
                "http://127.0.0.1:8000/query",
                params={
                    "question": question
                }
            )

            if response.status_code == 200:

                result = response.json()

                st.subheader("🤖 Answer")
                st.success(result["answer"])

                st.subheader("📄 Sources")

                for source in result["sources"]:

                    st.write(
                        f"""
**File:** {source["file"]}

**Page:** {source["page"]}
"""
                    )

            else:
                st.error("Something went wrong while querying.")