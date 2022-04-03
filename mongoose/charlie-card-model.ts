/**
 * @file Implements mongoose model to CRUD documents in the users collection.
 */
import mongoose from "mongoose";
import CharlieCardSchema from "./charlie-card-schema";
const CharlieCardModel = mongoose.model('CharlieCardModel', CharlieCardSchema);
export default CharlieCardModel;