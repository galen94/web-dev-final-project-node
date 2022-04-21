import Post from "../models/post";
import * as mongoose from "mongoose";
import {Schema} from "mongoose";
const PostSchema = new mongoose.Schema({
    post: String,
    stats: {
        likes: {type: Number, default: 0},
        applauds: {type: Number, default: 0},
    },
    user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    timePosted: Date().toLocaleString()
}, {collection: 'posts'});

export default PostSchema