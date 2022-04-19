/**
 * @file Implements mongoose schema to CRUD to represent conductor likes.
 */
import mongoose, {Schema} from "mongoose";
import ConductorLike from "../models/conductor-like"
import ConductorModel from "./conductor-model";
import CommuterModel from "./commuter-model";

const ConductorLikeSchema = new mongoose.Schema<ConductorLike>({
    conductor: {type: Schema.Types.ObjectId, ref: "ConductorModel", required: true},
    likedBy: {type: Schema.Types.ObjectId, ref: "CommuterModel", required: true},
}, {collection: 'conductorlikes'});

export default ConductorLikeSchema;