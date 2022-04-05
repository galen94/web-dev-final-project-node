/**
 * @file Implements mongoose model to CRUD documents in the conductors collection.
 */
import mongoose from "mongoose";
import ConductorSchema from "./conductor-schema";
const ConductorModel = mongoose.model('ConductorModel', ConductorSchema);
export default ConductorModel