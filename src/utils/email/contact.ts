import nodemailer from "nodemailer";

async function sendEmail(userInfo: string,sub:string, data: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.Email,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: userInfo,
    to: process.env.Email,
    subject: sub,
    text: data,
  };

  await transporter.sendMail(mailOptions);
}

export default sendEmail;
