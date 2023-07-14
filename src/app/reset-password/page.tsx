"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

export default function resetPasswordPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [isValid, setIsValid] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userId, setuserId] = useState("")
    const [user, setUser] = useState({
        password: "",
        confirmPass: ""
    });

    const validateToken = async (token: string)=>{
        try {
            setLoading(true);
            console.log("validating token")
            const response = await axios.post('/api/users/reset-password/validate', {token});
            console.log("token validated")
            setuserId(response.data.userId)
            setIsValid(true);
            
        } catch (error:any) {
            setIsValid(false);
            if(error.response){
                console.log(error.response.data.message);
            }
            else{
                console.log(error.message);
            }
        }
        finally{
            setLoading(false);
        }
    }

    const resetPassword = async ()=>{
        if(user.password !== user.confirmPass){
            toast.error("Password doesn't match");
            return;
        }

        try {
            setLoading(true);
           const response = await axios.post("/api/users/reset-password", {userId, password:user.password}) ;
           console.log(response.data.message);
           toast.success(response.data.message)
           router.push("/login")
        } catch (error: any) {
            console.log(error.message);
            if(error.response){
                toast.error(error.response.data.message);
            }
            else{
                toast.error(error.message);
            }
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.href.split("=")[1] || "";
        console.log(urlToken)
        if(urlToken.length > 0) validateToken(urlToken);
    }, [])

    useEffect(() => {
      if(user.password.length > 0 && user.confirmPass.length > 0){
        setButtonDisabled(false);
      }
      else{
        setButtonDisabled(true);
      }
    }, [user])
    
    
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {loading && <h1 className="text-4xl font-semibold">Loading</h1>}
            {!isValid && !loading && <h2 className="text-4xl font-semibold">Invalid Token</h2>}
            {isValid && !loading &&
                <>
                    <Toaster/>
                    <h2 className="text-4xl font-semibold mb-2">Reset Password</h2>
                    <label htmlFor="password">Password</label>
                    <input 
                        className="p-2 text-black rounded-lg border-gray-300 mb-3 focus:outline-none focus:border-gray-600"
                        type="password" 
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="password"
                    />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input 
                        className="p-2 text-black rounded-lg border-gray-300 mb-3 focus:outline-none focus:border-gray-600"
                        type="password" 
                        id="confirm-password"
                        value={user.confirmPass}
                        onChange={(e) => setUser({...user, confirmPass: e.target.value})}
                        placeholder="confirm password"
                    />

                    <button 
                        disabled={buttonDisabled.valueOf()}
                        onClick={resetPassword} 
                        className="py-2 px-24 bg-green-600 hover:bg-green-800 rounded mt-1"
                    >Reset</button>
                </>
            }
        </div>
    )
}