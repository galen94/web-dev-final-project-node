/**
 * @file Declares Follow data type representing relationship between
 * users, as in user follows another user
 */
import Commuter from "./commuter";
import mongoose from "mongoose";

/**
 * @typedef Follow Represents follows relationship between a user and another user
 * @property {User} user user being followed
 * @property {User} follower User following another user
 */
export default interface Follow {
    _id?: mongoose.Schema.Types.ObjectId,
    user: Commuter,
    follower: Commuter
};

