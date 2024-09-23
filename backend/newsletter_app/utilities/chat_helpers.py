import os
from langchain import hub
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from langchain.text_splitter import CharacterTextSplitter
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import OpenAIEmbeddings, ChatOpenAI


def reply_to_message(message, chat_history):
    """
    Reply to a message.

    This function takes a message and generates a response using a language model. 

    Args:
        message (str): The message to be replied to.
        chat_history (list): A list of tuples representing the chat history.
    Returns:
        str: The generated response to the message.
    """ 
    # Convert chat_history to the format expected by the retrieval chain
    formatted_history = [(speaker, msg) for speaker, msg in chat_history]
    print(formatted_history)
    embeddings = OpenAIEmbeddings(openai_api_key=os.environ["OPENAI_API_KEY"])
    llm = ChatOpenAI(model="gpt-4o-mini")

    query = message


    # Create a prompt template for the chat
    prompt_template = PromptTemplate(input_variables=["chat_history", "input"], template="You are a helpful assistant. Answer the following question based on the chat history:\n\n{chat_history}\n\nQuestion: {input}\n\nAnswer:")

    # Create a chain to combine documents
    chain = prompt_template | llm

    result = chain.invoke({"input": query, "chat_history": formatted_history})

    print(result.content)

    return result.content