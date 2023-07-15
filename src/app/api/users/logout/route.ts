import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse){
    try {
        const response = NextResponse.json({
            headers: {
                cookie: request.headers.get("cookie")
            },
            message: "Logout success",
            success: true
        }, {status: 200})

        // const {val, options} = request.cookies.getWithOptions("token")
        // response.cookies.set(process.env.ACCESS_TOKEN!, "", {expires: new Date(Date.now())})
        response.cookies.delete(process.env.ACCESS_TOKEN!)
        return response;
    } 
    catch (error: any) {
        return NextResponse.json({error:error.message}, {status: 500})
    }
}