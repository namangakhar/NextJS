"use client"

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";

//TODO: check for isVerified while logging in 
//TODO: do the same case for forgot password where you will need to get his password and re encrypt it and so on.
//TODO: redirect automatically to login verifyEmail is success.
//TODO: improve UI
//TODO: change the nodemailer thing to read from .env
//TODO: use vercel and try deployment
//TODO: in middleware check if token is from the same tokenSecret.


export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) setButtonDisabled(false);
        else setButtonDisabled(true);
    }, [user])

    const onLogin = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", user)
            console.log("Login successful", response.data)
            toast.success("Login success")
            router.push("/profile")
        } catch(error: any) {
            console.log("Login Failed", error.message);
            console.log(error);
            toast.error(error.message)
        } finally {
            setLoading(false);
            
        }
    }

    return (
        <div className= "flex flex-col items-center justify-center min-h-screen" >
        <h1 className= "text-center text-white text-2xl" > {loading ? "Processing" : "Login" } </h1>
        <hr/>
        <label htmlFor="email"> email</label>
        <input 
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => {setUser({...user, email: e.target.value})}}
            placeholder="email"
            className="p-2 border focus:border-gray-600 text-black"
        />
        <hr/>
        <label htmlFor="password"> password</label>
        <input 
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => {setUser({...user, password: e.target.value})}}
            placeholder="password"
            className="p-2 border focus:border-gray-600 text-black"
        />
        <hr/>
        <button className="p-2 border border-gray-300 rounded-lg mb-4" onClick={onLogin}>{buttonDisabled ? "No Login": "Login"}</button>
        <Link href="/signup" className="p-2 border border-gray-300 rounded-lg mb-4">Sign-Up here</Link>
        </div>
    )
}