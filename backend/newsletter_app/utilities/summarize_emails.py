from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI


def summarize(email):
    email_subject = email['subject']
    email_body = email['body']
    query = f"Please summarize the following email. If the email is forwarded, donot say it is a forwarded email:\n\nSubject: {email_subject}\n\nBody: {email_body}\n\nSummary:"
    
    llm = ChatOpenAI(model="gpt-4o-mini")

    chain = PromptTemplate.from_template(template=query) | llm

    result = chain.invoke({"input": query})
    return result
