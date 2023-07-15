import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel.js";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400});
        }

        await sendEmail({email, emailType:"RESET", userId: user._id});
        return NextResponse.json({message: "Password reset email sent to email"}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}