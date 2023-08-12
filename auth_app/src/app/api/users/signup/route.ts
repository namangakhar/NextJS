import { NextRequest, NextResponse } from "next/server"
import { connect } from "../../../dbConfig/dbConfig"
import { User } from "../../../../models/user.model";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../../../../helpers/mailer";




connect()

export async function POST(request: NextRequest) {
    try {
        console.log("body");
        const body = await request.json();
        const { email, password, username } = body;

        console.log(body);

        //Check if userAlready exist
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User Already Exists" }, { status: 400 })
        }

        //hashing Password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //Add user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        //send verify email
        sendEmail(email, "VERIFY", savedUser._id)

        return NextResponse.json({
            message: "User Created Successfully",
            state: "ok",
            data: savedUser
        }, { status: 201 },)

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}



