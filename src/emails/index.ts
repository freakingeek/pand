import { SMTPClient } from "emailjs";

const client = new SMTPClient({
  user: process.env.EMAIL,
  password: process.env.EMAIL_PASSWORD,
  host: "smtp.zoho.com",
  ssl: true,
});

export async function sendVerificationEmail(userEmail: string, verificationToken: string) {
  const mailOptions = {
    from: `"Pand" <${process.env.EMAIL}>`,
    to: userEmail,
    subject: "Email Verification",
    text: `<p>Please click <a href="http://localhost:8080/api_v1.0/users/verify/${verificationToken}">here</a> to verify your email.</p>`,
  };

  await client.sendAsync(mailOptions);
}
