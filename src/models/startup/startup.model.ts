import mongoose, { Schema } from "mongoose";
import { IStartup } from "../../types";

const startupSchema = new Schema<IStartup>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    url: { type: String },
    isOpenSource: { type: Boolean, default: false },
    githubUrl: { type: String },
  });

export const Startup = mongoose.model<IStartup>("Startup", startupSchema);