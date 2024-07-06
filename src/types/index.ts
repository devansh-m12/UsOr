import {Document } from "mongoose";

// Interface for User Document with custom methods
export interface IUser extends Document {
    email: string;
    fullName: string;
    avatar: string;
    password: string;
    refreshToken?: string | null;

    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}