/**
 * @file Implements mongoose schema to CRUD to represent users.
 */
import mongoose from "mongoose";
import Commuter from "./commuter";

export default interface CharlieCard {
    _id?: mongoose.Schema.Types.ObjectId,
    accountNumber: string,
    cardUser: Commuter,
    currentAmount: number,
    dateCreated: Date
};

