import nodemailer from "nodemailer"

export const getMailTransporter = async () => {
    const transporter = await nodemailer.createTransport({
        host: process.env.host,
        port: process.env.port,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.pass,
        }
    });
}