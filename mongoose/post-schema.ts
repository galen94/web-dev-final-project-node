import mongoose, {Schema} from "mongoose";
import Post from "../models/post";

const PostSchema = new mongoose.Schema<Post>({
    post: String,
    likes: {type: Number, default: 0},
    applauds: {type: Number, default: 0},
    name: String,
    username: String,
    userRole: {type: String, enum: ["admin", "conductor", "commuter"]},
    timePosted: Date().toLocaleString()
}, {collection: 'posts'});

export default PostSchema;