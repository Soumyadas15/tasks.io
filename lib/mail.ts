import nodemailer from "nodemailer";


const domain = process.env.NEXT_PUBLIC_PRODUCTION_URL;


export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PIN,
  },
});



const mailOptions: nodemailer.SendMailOptions = {
  from: process.env.NODEMAILER_EMAIL,
  to: email,
  subject: "Welcome to Tasks.io!",
  html: `<p>Your verification code is ${token}</p>`,
};

await transporter.sendMail(mailOptions);
}