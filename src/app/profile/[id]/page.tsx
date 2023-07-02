"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function UserProfile({params} : any){
    const router = useRouter();

    const onLogout = async ()=>{
        try{
            const response = await axios.get("/api/users/logout")
            console.log("Logout success")
            toast.success("Logout success")
            router.push("/")
        }
        catch(error: any){
            console.log("Logout failed", error.message)
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster/>
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl mt-2">Profile page 
                <span className="p-1 bg-orange-600 text-black rounded-md ml-2">{params.id}</span>
            </p>
            <button 
                onClick={onLogout}
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold rounded py-2 px-4 mt-4">Logout</button>
        </div>
    )
}