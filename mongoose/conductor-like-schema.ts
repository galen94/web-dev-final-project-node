/**
 * @file Implements mongoose schema to CRUD to represent conductor likes.
 */
import mongoose, {Schema} from "mongoose";
import ConductorLike from "../models/conductor-like"
import UserModel from "./user-model";

const ConductorLikeSchema = new mongoose.Schema<ConductorLike>({
    conductor: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
}, {collection: 'conductorlikes'});

export default ConductorLikeSchema;