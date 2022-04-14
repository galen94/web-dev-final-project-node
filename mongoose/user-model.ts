/**
 * @file Implements mongoose model to CRUD documents in the users collection.
 */
import mongoose from "mongoose";
import UserSchema from "./user-schema";
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;