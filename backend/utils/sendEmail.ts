

// import nodemailer from "nodemailer";

// export const sendEmail = async (
//   to: string,
//   subject: string,
//   text: string
// ) => {
//   try {
//     console.log("EMAIL_USER:", process.env.EMAIL_USER);
//     console.log("Sending email to:", to);

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//     });

//     console.log("Email sent:", info.response);

//   } catch (error: any) {
//     console.log("EMAIL ERROR:", error.message);
//     console.log(error);
//   }
// };


import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    console.log("SMTP VERIFIED");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("EMAIL SENT:", info.response);

  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};