/**
 * @file Implements model to represent users.
 */
import mongoose from "mongoose";
import CharlieCard from "./charlie-card";

export default interface Commuter {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    name: string,
    email?: string,
    dateOfBirth?: Date,
    homeStop?: string
    charlieCard: CharlieCard
};
