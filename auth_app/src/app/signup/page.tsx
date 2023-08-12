"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function SignUpPage() {

    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) setButtonDisabled(false);
        else setButtonDisabled(true);
    }, [user])

    const onSignUp = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("SignUp successful", response.data)
            router.push("/login")
        } catch(error: any) {
            // console.log("SignUp Failed", error.message)
            console.log("SignUp Failed", error.message)
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false);
            
        }
    }

    return (
        <div className= "flex flex-col items-center justify-center min-h-screen" >
        <h1 className= "text-center text-white text-2xl" > {loading ? "Processing" : "SignUp" }</h1>
        <hr/>
        <label htmlFor="username"> UserName</label>
        <input 
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => {setUser({...user, username: e.target.value})}}
            placeholder="UserName"
            className="p-2 border focus:border-gray-600 text-black"
        />
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
        <button className="p-2 border border-gray-300 rounded-lg mb-4" onClick={onSignUp}>{buttonDisabled ? "No SignUp": "SignUp"}</button>
        {/* <Link href="/login" className="p-2 border border-gray-300 rounded-lg mb-4">Login here</Link> */}
        </div>
    )
}