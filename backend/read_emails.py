import imaplib
import email
from email.header import decode_header
from langchain_community.document_loaders import UnstructuredEmailLoader
import os

# Set your email credentials
IMAP_SERVER = "imap.gmail.com"  # For Gmail, this is the server. Adjust for other services.
EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")

# Connect to the server
mail = imaplib.IMAP4_SSL(IMAP_SERVER)

# Log in to your email account
mail.login(EMAIL, PASSWORD)

# Select the mailbox you want to read (inbox by default)
mail.select("inbox")

# Search for all emails in the inbox
status, messages = mail.search(None, "ALL")

# Convert messages to a list of email IDs
email_ids = messages[0].split()

# Define a list to store documents
documents = []

# Fetch the latest 10 emails (or adjust this to fit your needs)
for i in email_ids[-10:]:
    # Fetch the email by ID
    status, msg_data = mail.fetch(i, "(RFC822)")
    
    # For each response part (msg_data contains the entire email)
    for response_part in msg_data:
        if isinstance(response_part, tuple):
            # Parse the raw email data
            msg = email.message_from_bytes(response_part[1])
            
            # Decode the email subject
            subject, encoding = decode_header(msg["Subject"])[0]
            if isinstance(subject, bytes):
                subject = subject.decode(encoding if encoding else "utf-8")
            
            # Extract email content
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == "text/plain":
                        email_body = part.get_payload(decode=True).decode("utf-8")
            else:
                email_body = msg.get_payload(decode=True).decode("utf-8")
            
            # Save the email body into a temporary file (for LangChain EmailLoader)
            with open("temp_email.eml", "w") as f:
                f.write(email_body)
            
            # Load the email into LangChain using EmailLoader
            loader = UnstructuredEmailLoader(file_path="temp_email.eml")
            email_documents = loader.load()
            
            # Append the email documents to the documents list
            documents.extend(email_documents)

# Close the connection to the mail server
mail.close()
mail.logout()

# You now have the email contents loaded into the 'documents' list.
for doc in documents:
    print(doc.page_content)

