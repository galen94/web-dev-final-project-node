/**
 * @file Implements mongoose model to CRUD
 * documents in the postLikes collection
 */
import mongoose from "mongoose";
import PostLikeSchema from "./post-like-schema";
const PostLikeModel = mongoose.model("PostLikeModel", PostLikeSchema);
export default PostLikeModel;