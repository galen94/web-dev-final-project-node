import mongoose from "mongoose";
import User from "./user";

export default interface Post {
    _id?: mongoose.Schema.Types.ObjectId,
    post: string,
    stats: {
        likes: number,
        applauds: number,
    }
    user: User,
    timePosted: Date,
};