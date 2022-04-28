/**
 * @file Implements mongoose model to CRUD documents in the routes collection.
 */
import mongoose from "mongoose";
import ConductedRouteSchema from "./conducted-route-schema";
const ConductedRouteModel = mongoose.model('ConductedRouteModel', ConductedRouteSchema);
export default ConductedRouteModel;