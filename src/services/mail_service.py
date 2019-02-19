from flask_mail import Mail, Message


class MailService:
    def __init__(self, app):
        self.mail = Mail(app)

    def send_password_reset_email(self):
        raise NotImplementedError
