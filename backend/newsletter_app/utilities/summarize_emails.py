from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI


def summarize(email):
    email_subject = email['subject']
    email_body = email['body']
    query = f""""Please summarize the following email.
    If the email is forwarded, donot say it is a forwarded email:\n\nSubject: {email_subject}\n\nBody: {email_body}\n\nSummary:"""
    
    llm = ChatOpenAI(model="gpt-4o-mini")

    chain = PromptTemplate.from_template(template=query) | llm

    result = chain.invoke({"input": query})
    return result


def email_comparison(emails):
    email_comparisons = []
    query = f"""Please compare the content of the following emails. Please stick to the facts and donot add any personal opinions. 
    The output is sent as an email, so format it in the form of a HTML email. Don't talk about the html formatting.
    If the email is forwarded, donot say it is a forwarded email:\n\n"""
    for email in emails:
        query += f"Subject: {email['subject']}\n\nSummary: {email['body']}\n\n"

    llm = ChatOpenAI(model="gpt-4o-mini")

    chain = PromptTemplate.from_template(template=query) | llm

    result = chain.invoke({"input": query})
    return result
