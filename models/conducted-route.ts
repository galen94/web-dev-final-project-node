/**
 * @file Implements model to represent routes.
 */
import mongoose from "mongoose";
import User from "./user";

export default interface ConductedRoute {
    _id?: mongoose.Schema.Types.ObjectId,
    routeString: string,
    user: User
};