/**
 * @file Implements mongoose model to CRUD documents in the conductor likes collection.
 */
import mongoose from "mongoose";
import ConductorLikeSchema from "./conductor-like-schema";
const ConductorLikeModel = mongoose.model('ConductorLikeModel', ConductorLikeSchema);
export default ConductorLikeModel;