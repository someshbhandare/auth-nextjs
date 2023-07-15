"use client";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function SignupPage(){
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data)
            toast.success(response.data.message)
            router.push("/login")
        } 
        catch (error: any) {
           console.log("Signup failed", error.message);
           if(error.response){
                toast.error(error.response.data.message);
            }else{
                toast.error(error.message);
            }
        }
        finally{
            setLoading(false);
        }
    }
    
    useEffect(() => {
      if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
        setButtonDisabled(false)
      }
      else{
        setButtonDisabled(true)
      }
    }, [user])
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            
            <Toaster />
            <h1 className="text-white text-4xl font-semibold mb-4">{loading ? "Processing" : "SignUp"}</h1>
            <hr />
            <label htmlFor="username text-3xl mb-3">Username</label>
            <input 
                className="p-2 text-black rounded-lg border-gray-300 mb-4 focus:outline-none focus:border-gray-600"
                type="text" 
                id="username"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
            />
            <label htmlFor="email text-3xl mb-3">Email</label>
            <input 
                className="p-2 text-black rounded-lg border-gray-300 mb-4 focus:outline-none focus:border-gray-600"
                type="email" 
                id="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password text-3xl mb-3">Password</label>
            <input 
                className="p-2 text-black rounded-lg border-gray-300 mb-4 focus:outline-none focus:border-gray-600"
                type="password" 
                id="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />

            <button 
                disabled={buttonDisabled ? true : false}
                onClick={onSignup} 
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-1 mb-3">
                Signup
            </button>
            <Link className="text-sm" href="/login">Visit login page</Link>
        </div>
    )
}