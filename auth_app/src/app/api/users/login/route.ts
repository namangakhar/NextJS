import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        //Check if user exist
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User Doesn't Exists" }, { status: 400 })
        }

        //validate Password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) return NextResponse.json({ error: "Invalid Password" }, { status: 400 })

        //creating token
        const tokenData = {
            id: user._id,
            email,
            username: user.username,
        }
        const jwtToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
        console.log(jwtToken);

        const response = NextResponse.json({
            message: "Login Successfully",
            state: "ok",
            data: jwt
        })

        response.cookies.set("token", jwtToken, { httpOnly: true })

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}