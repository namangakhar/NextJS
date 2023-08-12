import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => { console.log("DB connected"); })
        connection.on('error', (err) => {
            console.log("DB Error: ", err);
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
    }
}