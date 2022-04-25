/**
 * @file Implements model to represent users.
 */
import mongoose from "mongoose";
import UserRole from "./role";

export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    name: string,
    email: string,
    userRole: UserRole,
    dateOfBirth?: Date,
    homeStop?: string
    charlieCardBalance: number,
    dateJoined?: Date,
    currentRouteConducting?: string,
    favoriteRouteToConduct?: string,
    jobTitle?: string
};