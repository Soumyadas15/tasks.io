import nodemailer from "nodemailer";


const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (
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
    subject: "Login to your account",
    html: `<p>Your confirmation code is ${token}</p>`,
  };

  await transporter.sendMail(mailOptions);
}

export const sendPasswordResetEmail = async (
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

  const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);
}


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

const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

const mailOptions: nodemailer.SendMailOptions = {
  from: process.env.NODEMAILER_EMAIL,
  to: email,
  subject: "Welcome to Polymer!",
  html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
};

await transporter.sendMail(mailOptions);
}