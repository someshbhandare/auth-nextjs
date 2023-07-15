"use client";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast"

export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState("")

    useEffect(() => {
      getData()
    }, [])

    const getData = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data.user._id)
        setData(res.data.user._id)
    }    

    const onLogout = async ()=>{
        try{
            const response = await axios.get("/api/users/logout")
            console.log("Logout success")
            toast.success("Logout success")
            router.push("/login")
        }
        catch(error: any){
            console.log("Logout failed", error.message)
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1>Profile</h1>
            <hr />
            <p className="my-3">Profile page
                <span className="ms-2 p-2 bg-green-500 hover:bg-green-800 rounded">{data ? <Link href={`/profile/${data}`}>{data}</Link> : "Nothing"}</span>
            </p>
            <button 
                onClick={onLogout}
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold rounded py-2 px-4 mt-3">Logout</button>
        </div>
    )
}