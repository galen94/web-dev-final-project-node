/**
 * @file Implements model to represent conductors.
 */
import mongoose from "mongoose";

export default interface Conductor {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    name: string,
    email: string,
    yearsAsConductor: string,
    currentRouteToConduct: string,
    favoriteRouteToConduct: string,
    favoritedByUsers: Array<string>,
}