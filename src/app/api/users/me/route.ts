import { connect } from "@/dbConfig/dbConfig";
import getTokenData from "@/helpers/getTokenData";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function GET(request: NextRequest) {
    try {
        const userId = await getTokenData(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "user data",
            user
        }, {status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 400})
    }
}