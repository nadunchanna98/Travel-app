import os
import streamlit as st
from dotenv import load_dotenv
import pickle
from streamlit_extras.add_vertical_space import add_vertical_space
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter # for splitting text into chunks
from langchain.embeddings.openai import OpenAIEmbeddings 
from langchain.vectorstores import FAISS
from langchain.llms import OpenAI  # this is the LLM model , llm used to be called gpt
from langchain.chains.question_answering import load_qa_chain  # this is the question answering chain , it is a wrapper around the LLM model
from langchain.callbacks import get_openai_callback  # this is a callback function for the LLM model

# sidebar contents
with st.sidebar:
    st.title("Chat with your pdf file")  # LLM (Lung Lesion Management)
    st.markdown(
        """
        ### About
        This ap is an LLM-powerd chatbot build using:
        - [Streamlit](https://streamlit.io)
        - [LangChain](https://python.langchain.com)
        - [OpenAI](https://platform.openai.com/docs/models) LLM model
        
        """
    )
    add_vertical_space(3)
    st.write("Made by [nadun channa](https://evenbees.com/)")

load_dotenv()  # load environment variables


def main():
    st.header("Chat with your pdf file")

    # file upload
    pdf = st.file_uploader("Upload a pdf file", type=["pdf"])

    if pdf is not None:
        pdf_reader = PdfReader(pdf)
        st.write(pdf_reader)

        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()

        # st.write(text)

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )
        chunks = text_splitter.split_text(text=text)
        # st.write(chunks)

        
        store_name = pdf.name[:-4]
        
        if os.path.exists(f"{store_name}.pkl"):
            with open(f"{store_name}.pkl", "rb") as f:
                VectorStore = pickle.load(f)
                # st.write("Embeddings Loaded from the Disk")
        else:
            embeddings = OpenAIEmbeddings()
            VectorStore = FAISS.from_texts(chunks,embeddings)
            with open(f"{store_name}.pkl", "wb") as f:
                pickle.dump(VectorStore, f)
                # st.write("Embeddings Saved to the Disk")

        # Accepting user questions / queries
        query = st.text_input("Ask your question here")
        
        if query:
            docs = VectorStore.similarity_search(query , k=3) # k is the number of results to return
            
            #llm = OpenAI(model_name="gpt-3.5-turbo") # chatgpt 3.5
            llm = OpenAI()  # chatgpt 4
            chain = load_qa_chain(llm = llm , chain_type= "stuff") # stuff is the name of the chain
           
            with get_openai_callback() as cb:
               
                response = chain.run(input_documents=docs, question=query)
                print(cb)  # print the callback , cost and time taken
            st.write(response)
            
            

if __name__ == "__main__":
    main()
