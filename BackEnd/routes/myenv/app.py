from PyPDF2 import PdfReader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from typing_extensions import Concatenate
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
import os
import sys

# Set OpenAI API key
os.environ["OPENAI_API_KEY"] = "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"

try:
    # Read PDF using PyPDF2
    # pdfreader = PdfReader('data/data.pdf')
    
    pdf_path = os.path.abspath('E:/Mobile apps/projects/Tourist guide app/Product/BackEnd/routes/myenv/data/data.pdf')
    pdfreader = PdfReader(pdf_path)
    
    raw_text = ''
    for i, page in enumerate(pdfreader.pages):
        content = page.extract_text()
        if content:
            raw_text += content

    # Split text using Character Text Splitter
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=800,
        chunk_overlap=200,
        length_function=len,
    )
    texts = text_splitter.split_text(raw_text)

    # Download embeddings from OpenAI
    embeddings = OpenAIEmbeddings()

    # Set up document search with FAISS
    document_search = FAISS.from_texts(texts, embeddings)

    # Load Question-Answering chain
    chain = load_qa_chain(llm=OpenAI())

    # Get the user's query from the command-line arguments
    query = " ".join(sys.argv[1:])
    
    # query = "What are the projects done? "

    # Run the query
    docs = document_search.similarity_search(query)
    message = chain.run(input_documents=docs, question=query)
    print(message)

except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
