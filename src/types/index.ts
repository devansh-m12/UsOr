import {Document } from "mongoose";

// Interface for User Document with custom methods
export interface IUser {
    email: string;
    fullName: string;
    avatar: string;
    password: string;
    refreshToken?: string | null;

    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

export interface IUserDocument extends IUser, Document {}

export interface IStartup {
  name?: string;
  description?: string;
  url?: string;
  isOpenSource?: boolean;
  githubUrl?: string;
}

export interface IStartupDocument extends IStartup, Document {}