"use client";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login(){
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } 
        catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0){
        setButtonDisabled(false);
      }
      else{
        setButtonDisabled(true)
      }
    }, [user])
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-white text-4xl font-semibold mb-4">
                {loading ? "Processing" : "Login"}
            </h1>
            <hr />
            
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
                disabled={buttonDisabled.valueOf()}
                onClick={onLogin} 
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-1 mb-3">Login</button>
            <Link className="text-sm" href="/signup">Visit signup page</Link>
        </div>
    )
}