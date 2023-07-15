import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {userId , password} = reqBody;

        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.findByIdAndUpdate(userId, {password: hashedPassword});
        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 400});
        }

        // delete tokens from database
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message: "Password reset successfully"}, {status: 200});
    } catch (error:any) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}