import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("token:",token)

        // find user from token
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({message: "Invalid token"}, {status: 400});
        }

        return NextResponse.json({message: "token validated", userId: user._id});
        
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}