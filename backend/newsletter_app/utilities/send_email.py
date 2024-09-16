import os

import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content

SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')


def send_email(emails, email_comparisons, to_email='pruthvi.0077@gmail.com'):
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

    email_content += f"Email Comparisons: {email_comparisons}\n\n"

    # Construct the HTML email content
    html_content = "<html><body>"
    html_content += "<h1>Newsletter Digest</h1>"
    
    for email in emails:
        html_content += f"<h2>Subject: {email['subject']}</h2>"
        html_content += f"<p><strong>Summary:</strong> {email['summary']}</p>"
    
    html_content += f"<h2>Email Comparisons</h2>"

    html_content += f"<p>{email_comparisons}</p>"
    
    html_content += "</body></html>"

    # Create the email message
    message = Mail(
        from_email=Email(from_email),
        to_emails=To(email_to),
        subject=subject,
        html_content=html_content
    )

    # Send the email
    try:
        response = sg.send(message)
        print(f"Email sent. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred while sending the email: {str(e)}")
        return False


    return response.status_code == 200
