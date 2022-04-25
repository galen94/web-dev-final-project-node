import Post from "../models/post";
import * as mongoose from "mongoose";
import {Schema} from "mongoose";
const PostSchema = new mongoose.Schema<Post>({
    post: String,
    stats: {
        likes: {type: Number, default: 0},
        applauds: {type: Number, default: 0},
    },
    user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    timePosted: {type: Date, default: Date.now},
}, {collection: 'posts'});

export default PostSchema