/**
 * @file Implements mongoose model to CRUD documents in the users collection.
 */
import mongoose from "mongoose";
import CommuterSchema from "./commuter-schema";
const CommuterModel = mongoose.model('CommuterModel', CommuterSchema);
export default CommuterModel;