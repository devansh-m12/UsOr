import { Request, Response } from 'express';
import { Model } from 'mongoose'; 
import { User } from '../../models'; 
import { ApiError, ApiResponse, asyncHandler } from '../../utils';
import {IUser, IUserDocument} from '../../types'


class Auth {
    private userModel: Model<IUserDocument>;

    constructor() {
        this.userModel = User as Model<IUserDocument>; 
    }

    async generateAccessTokenAndRefreshToken(userId: string): Promise<{ accessToken: string, refreshToken: string }> {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new ApiError(404, "User not found");
            }
            const accessToken: string = user.generateAccessToken();
            const refreshToken: string = user.generateRefreshToken();
            user.refreshToken = refreshToken;
            await user.save({ validateBeforeSave: false });
            return { accessToken, refreshToken };
        } catch (error: any) {
            throw new ApiError(500, "Something went wrong while generating tokens");
        }
    }

    registerUser = asyncHandler(async (req: Request, res: Response) => {
        const { fullName, email, password, avatar }: {
            fullName: string,
            email: string,
            password: string,
            avatar: string 
        } = req.body;

        // Validation
        if ([fullName, email, password, avatar].some((field) => !field?.trim())) {
            throw new ApiError(400, "All fields are required");
        }

        // Check if user already exists
        const existedUser: IUser | null = await this.userModel.findOne({
            $or: [ { email }]
        }).exec();

        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists");
        }

        // Avatar validation
        if (!avatar) {
            throw new ApiError(400, "Avatar file is required");
        }

        // Create new user
        const newUser: IUserDocument = await this.userModel.create({
            fullName,
            avatar,
            email,
            password,
        });

        // Fetch newly created user details
        const createdUser: IUserDocument | null = await this.userModel.findById(newUser._id).select(
            "-password -refreshToken"
        ).exec();

        // Handle error if user not created
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        // Return success response
        return res.status(201).json(
            new ApiResponse(200, "User registered Successfully", [createdUser])
        );
    });
}

export default Auth;
