import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest){
    const newUrl = request.nextUrl.pathname;
    const isPublicPath = newUrl == "/login" || newUrl == "/signup"
    const token = request.cookies.get(process.env.ACCESS_TOKEN!)?.value || "";
    
    // console.log("isPublicPath:",isPublicPath,", token:", token);
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.url));
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/login", "/signup", "/profile", "/profile/:id*"],
  }