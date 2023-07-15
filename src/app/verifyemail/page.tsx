"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";

export default function verifyEmailPage(){
    const [token, setToken] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [error, setError] = React.useState(false);

    const verifyEmail = async ()=>{
        try{
            const response = await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
            console.log("email verified successfully");
        } catch(error: any){
            setError(true);
            console.log(error.response.data);
        }
    }

    React.useEffect(()=>{
        const urlToken = window.location.href.split("=")[1];
        setToken(urlToken || "")
    }, [])

    React.useEffect(() => {
      if(token.length > 0){
        verifyEmail()
      }
    }, [token])
    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="bg-orange-500 text-black">{token ? token : "No token"}</h2>
            {verified && (
                <div className="text-2xl text-center">
                    <h2>Email Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}

            {error && (
                <div className="text-2xl text-center">
                    <h2>Error</h2>
                </div>
            )}
        </div>
    )
}