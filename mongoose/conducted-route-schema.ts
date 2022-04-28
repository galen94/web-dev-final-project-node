/**
 * @file Implements mongoose schema to CRUD to represent routes.
 */
import mongoose, {Schema} from "mongoose";
import ConductedRoute from "../models/conducted-route";

const ConductedRouteSchema = new mongoose.Schema<ConductedRoute>({
    routeString: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: 'conductedRoutes'});

export default ConductedRouteSchema;