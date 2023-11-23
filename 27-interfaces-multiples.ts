interface INotificationEmail {
  sentEmail(from: string, to: string, subject: string, body: string): void;
}

interface INotificationWhatsApp {
  sentMessage(phone: string, message: string): void;
}

class NotificationApplicant
  implements INotificationEmail, INotificationWhatsApp
{
  sentEmail(from: string, to: string, subject: string, body: string): void {
    console.log("Email send to " + to);
  }

  sentMessage(phone: string, message: string): void {
    console.log("Message send to " + phone);
  }
}

class NotificationPlanner implements INotificationWhatsApp {
  sentMessage(phone: string, message: string): void {
    console.log("Message send to " + phone);
  }
}

const notificationApplicant = new NotificationApplicant();
notificationApplicant.sentEmail(
  "remitente@correo.com",
  "destinatario@email.com",
  "Register completed",
  "Thanks to register in our application"
);
notificationApplicant.sentMessage("51-999-999-999", "Register completed");

const notificationPlanner = new NotificationPlanner();
notificationPlanner.sentMessage("51-999-999-999", "Register completed");
