import { NextRequest, NextResponse } from "next/server";
import User from "./models/UserModel";
import getTokenData from "./helpers/getTokenData";

export async function middleware(request: NextRequest){
    const newUrl = request.nextUrl.pathname;
    const isPublicPath = newUrl == "/login" || newUrl == "/signup"
    let validToken = false;

    try {
        await getTokenData(request);
        validToken = true;
    } catch (error) {
        validToken = false;
    }
    
    // console.log("isPublicPath:",isPublicPath,", token:", token);
    if(isPublicPath && validToken){
        return NextResponse.redirect(new URL('/', request.url));
    }
    if(!isPublicPath && !validToken){
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/login", "/signup", "/profile", "/profile/:id*"],
  }