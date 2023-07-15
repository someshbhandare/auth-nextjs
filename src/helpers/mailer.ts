import nodemailer from 'nodemailer';
import User from '@/models/UserModel.js';
import bcryptjs from 'bcryptjs';

export async function sendEmail({email, emailType, userId}:any) {
    try {
        // create the token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // find user and update the token
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const subject = (emailType === "VERIFY") ? "Verify your email" : "Reset you password";
        const url = (emailType === "VERIFY") ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}` : `${process.env.DOMAIN}/reset-password?token=${hashedToken}`

        const mailOptions = {
            from: "somesh@gmail.com",
            to: email,
            subject: subject,
            html: `<p>Click <a href="${url}">Here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or
            copy and paste below link to your browser <br> 
            "${url}`
        }  

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}