import { Request, Response } from "express";
import sendEmail from "../utils/email/contact";

class ContactController {
  public static async sendMessage(req: Request, res: Response): Promise<void> {
    const { firstname, lastname, email, subject, message } = req.body;

    if (!firstname || !lastname || !email || !subject || !message) {
      res.status(403).json({ message: "Please input must not be empty" });
      return;
    }

    try {
      const composedMessage = `
        Firstname: ${firstname}
        Lastname: ${lastname}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `;

      await sendEmail(email, composedMessage,subject);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  }
}

export default ContactController;
