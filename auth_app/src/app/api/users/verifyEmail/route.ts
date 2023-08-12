import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import { User } from "../../../../models/user.model";

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        const { reqType } = reqBody;
        console.log(token);

        //TODO: check this to make it work for verify and forgot pass
        const userData = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }              //search where expiry is > current time.
        })

        if (!userData) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 })
        } else {
            userData.isVerified = true;
            userData.verifyToken = null;
            userData.verifyTokenExpiry = null;
            await userData.save()                   //reWrites user
        }

        // if (emailType == 'VERIFY') {
        // await User.findByIdAndUpdate(userId, {
        //     verifyToken: hashedToken,
        //     verifyTokenExpiry: Date.now() + 5 * 60 * 1000,             //5 mins expiry
        // })
        // } else if (emailType == 'RESET') {
        //     await User.findByIdAndUpdate(userId, {
        //         forgotPassword: hashedToken,
        //         forgotPasswordExpiry: Date.now() + 15 * 60 * 1000,             //15 mins expiry
        //     })
        // }

        const response = NextResponse.json({
            message: "Email Verified Successfully",
            state: "ok",
        })
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}