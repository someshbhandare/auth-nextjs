"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function forgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgot-password", {email});
            console.log(response.data.message)
            toast.success(response.data.message)
            // router.push('/login')
        } catch (error: any) {
            console.log(error);
            if(error.response){
                toast.error(error.response.data.error);
            }
            else{
                toast.error(error.message, {duration: 1})
            }
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (email.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [email])

    return (
        <div className="flex flex-col items-center justify-center gap-1 min-h-screen">
            <Toaster/>
            <h2 className="text-3xl font-semibold mb-1">{loading ? "Loading" : "Reset Password"}</h2>
            <label htmlFor="email" className="">Email</label>
            <input 
                type="email" 
                className="py-2 px-3 border-0 rounded outline-none text-black" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                name="email" placeholder="email" 
            />
            <button
                disabled={buttonDisabled.valueOf()}
                onClick={resetPassword}
                className="py-2 px-3 bg-blue-600 hover:bg-blue-800 rounded mt-2"
            >Reset</button>
        </div>
    )
}