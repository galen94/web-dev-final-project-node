/**
 * @file Create PostLike Schema
 */
import mongoose, {Schema} from "mongoose";
import PostLike from "../models/post-like";

const PostLikeSchema = new mongoose.Schema<PostLike>({
    post: {type: Schema.Types.ObjectId, ref: "PostModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "CommuterModel"},
}, {collection: "postLikes"});
export default PostLikeSchema;
