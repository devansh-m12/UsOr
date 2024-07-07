import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser, IUserDocument } from "../../types";

dotenv.config({
    path: "./.env"
});


const userSchema = new Schema<IUserDocument>({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });

userSchema.pre<IUserDocument>("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});

userSchema.methods.isPasswordCorrect = async function (this: IUser, password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (this: IUserDocument) {
    const secret: string | undefined = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables.");
    }
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        secret as Secret,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function (this: IUserDocument) {
    const secret: string | undefined = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined in the environment variables.");
    }
    return jwt.sign(
        {
            _id: this._id,
        },
        secret as Secret,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model<IUserDocument>("User", userSchema);
