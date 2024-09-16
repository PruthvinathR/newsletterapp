import os

import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content

SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')


def send_email(emails, to_email='cvsrohit@gmail.com'):
    sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)
    from_email = "contextitest9@gmail.com"
    email_to = to_email
    subject = "Newsletter Digest"
    content = Content("text/plain", emails)
    
    # Construct the email content
    email_content = "Here's your newsletter digest:\n\n"
    for email in emails:
        email_content += f"Subject: {email['subject']}\n"
        email_content += f"Summary: {email['summary']}\n\n"

    content = Content("text/plain", email_content)

    # Create the email message
    message = Mail(
        from_email=Email(from_email),
        to_emails=To(email_to),
        subject=subject,
        plain_text_content=email_content
    )

    # Send the email
    try:
        response = sg.send(message)
        print(f"Email sent. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred while sending the email: {str(e)}")
        return False


    return response.status_code == 200
