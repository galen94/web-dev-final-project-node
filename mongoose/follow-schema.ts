/**
 * @file Create Follow Schema
 */
import mongoose, { Schema } from "mongoose";
import Follow from "../models/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    user: {type: Schema.Types.ObjectId, ref: "CommuterModel"},
    follower: {type: Schema.Types.ObjectId, ref: "CommuterModel"},
}, {collection: "follows"});
export default FollowSchema;