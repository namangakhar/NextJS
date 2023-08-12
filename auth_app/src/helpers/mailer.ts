
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model";
import { getMailTransporter } from "./getMailtransporter";
import nodemailer from "nodemailer"


const getMailOptions = (toEmail: string, emailSubject: string, text: string, html: string) => {
    return {
        from: "naman.gakhar@red.health",
        to: toEmail,
        subject: emailSubject,
        text,
        html
    }
}

export const sendEmail = async (email: string, emailType: string, userId: string) => {
    try {
        console.log(email, emailType, userId)
        //create hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType == 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 5 * 60 * 1000,             //5 mins expiry
            })
        } else if (emailType == 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPassword: hashedToken,
                forgotPasswordExpiry: Date.now() + 15 * 60 * 1000,             //15 mins expiry
            })
        }

        const text = emailType === "RESET" ? "reset your password" : "verify your email"
        const html = `<p> click on <a href=${process.env.domain}/verifyEmail?token=${hashedToken}>here</a> to ${text}`;
        // const mailTransporter: nodemailer.Transporter = await getMailTransporter();
        // const mailTransporter = nodemailer.createTransport({
        //     host: process.env.host,
        //     port: process.env.port,
        //     secure: true,
        //     auth: {
        //         user: process.env.user,
        //         pass: process.env.pass,
        //     }
        // });
        var mailTransporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "e430446a9c3235",
                pass: "5b499b33a604a9"
            }
        });
        const mailOptions: any = getMailOptions(email, emailType, text, html);

        const sendMailResponse = await mailTransporter.sendMail(mailOptions);
        console.log("sendMailResponse: ", sendMailResponse);
        console.log("Message sent: %s", sendMailResponse.messageId);

        return sendMailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}