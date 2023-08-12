"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    
    const [loading, setLoading] = useState(false)
    const [userData, setuserData] = useState("")

    const onLogout = async () => {
        try{
            setLoading(true);
            const response = await axios.get("/api/users/logout")
            console.log("Logout successful", response.data)
            toast.success("Logout success")
            router.push("/login")
        } catch(error: any) {
            console.log("Logout Failed", error.message);
            console.log(error);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    const getUserDetails = async() => {
        try{
            setLoading(true);
            const response = await axios.get("/api/users/myInfo")
            console.log("userData Found", response.data)
            setuserData(response.data.data._id);
        } catch(error: any) {
            console.log("Failed to get userData", error.message);
            console.log(error);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }
    
    return(
        <div className="flex flex-col items-center justify-center py-2">
            <h1 className= "text-center text-white text-2xl" > {loading ? "Logging out" : "Profile" } </h1>
            <h2 className= "p-2 rounded bg-green-400" > {userData === "" ? "Nothing" : <Link href={`/profile/${userData}`} className="p-2 border border-gray-300 rounded-lg mb-4">{userData}</Link> } </h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="p-2">
            <button className="bg-blue-500 mt-4 hover:bg-blue-7000 p-3 border border-gray-300 text-white font-bold rounded" onClick={onLogout}> Logout</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="p-2">
            <button className="bg-green-500 mt-4 hover:bg-blue-7000 p-3 border border-gray-300 text-white font-bold rounded" onClick={getUserDetails}> See User Details</button>
        </div>
        </div>
    )
}