/**
 * @file Implements mongoose schema to CRUD to represent users.
 */
import mongoose, {Schema} from "mongoose";
import User from "../models/user";

const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    userRole: {type: String, enum: ["admin", "conductor", "commuter"]},
    dateOfBirth: Date,
    homeStop: {type: String},
    charlieCard: {type: Schema.Types.ObjectId, ref: "CharlieCardModel"},
    yearsAtMBTA: Number,
    currentRouteConducting: String,
    favoriteRouteToConduct: String,
    jobTitle: String
}, {collection: 'users'});

export default UserSchema;


