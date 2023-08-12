import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { User } from "../../../../models/user.model";

connect();

export async function GET(request: NextRequest) {

    try {
        const userId = getDataFromToken(request);
        const userData = await User.findOne({ _id: userId }).select("-password -isAdmin");

        const response = NextResponse.json({
            message: "User Found",
            state: "ok",
            data: userData
        })
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}