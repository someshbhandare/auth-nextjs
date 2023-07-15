import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';


export default async function getTokenData(request:NextRequest) {
    try {
        const token = request.cookies.get(process.env.ACCESS_TOKEN!)?.value || "";
        const decodedToken:any = await jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id;
    } 
    catch (error: any) {
        throw new Error(error.message)
    }
}