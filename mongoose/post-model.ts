import mongoose from "mongoose";
import PostSchema from "./post-schema"

const PostModel = mongoose.model("PostModel", PostSchema);
export default PostModel;