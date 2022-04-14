import mongoose from "mongoose";
import PostApplaudSchema from "./post-applaud-schema";

const PostApplaudModel = mongoose.model("PostApplaudModel", PostApplaudSchema);
export default PostApplaudModel;