import Post from "../models/post";
import * as mongoose from "mongoose";
import {Schema} from "mongoose";
const PostSchema = new mongoose.Schema({
    post: String,
    stats: {
        likes: {type: Number, default: 0},
        applauds: {type: Number, default: 0},
    },
    user: String,
    timePosted: String
}, {collection: 'posts'});

export default PostSchema