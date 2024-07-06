import connectDB from "./db/index";
import dotenv from "dotenv";
import app from "./app";

dotenv.config({
    path: "./.env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
    app.on("error", (err) => {
        console.log("Server error: ", err);
    });
})
.catch((err : any) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});
