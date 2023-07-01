"use client";
import Link from "next/link";
import React from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login(){
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-white text-4xl font-semibold mb-4">Login</h1>
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

            <button onClick={onLogin} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-1 mb-3">Login</button>
            <Link className="text-sm" href="/signup">Visit signup page</Link>
        </div>
    )
}