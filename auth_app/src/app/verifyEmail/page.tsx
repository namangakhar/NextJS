"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function verifyEmailPage() {

    const router = useRouter();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async() =>{
        try{
            const verifyEmail = await axios.post('/api/users/verifyEmail', {token})
            setVerified(true);
        } catch(error: any) {
            setError(true);
            console.log(error)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const search = window.location.search.split('=')[1] || "";
        setToken(search)
    }, [])

    useEffect(() => {
        if(token.length>0) verifyUserEmail();

    }, [token])

    return (
        <div className="flex flex-col items-center justify-center py-2">
            <h2 className="text-4xl p2 bg-orange-400 text-black"> verifyEmail: {token ? `${token}`: 'No token found'}</h2>
            {verified && <div>
                <h2 className="text-2xl">Email Verified </h2> 
                <Link href="/login">Login here </Link> 
                </div>
            }
            {error && <div>
                <h2 className="text-2xl bg-red-500">Error Occured </h2> 
                </div>
            }
        </div>
    )
}