import mongoose, {Schema} from "mongoose";
import PostApplaud from "../models/post-applaud";

const PostApplaudSchema = new mongoose.Schema<PostApplaud>({
    post: {type: Schema.Types.ObjectId, ref: "PostModel"},
    applaudedBy: {type: Schema.Types.ObjectId, ref: "CommuterModel"},
}, {collection: "postApplauds"});

export default PostApplaudSchema;