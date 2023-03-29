import nodemailer from "nodemailer";

const createTransport = () => {
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "eba46dae15dca2",
      pass: "386219f3eec0c3",
    },
  });
};

export const transporter = createTransport();
