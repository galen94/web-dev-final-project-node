/**
 * @file Implements mongoose schema to CRUD to represent users.
 */
import mongoose, {Schema} from "mongoose";
import CharlieCard from "../models/charlie-card";

const CharlieCardSchema = new mongoose.Schema<CharlieCard>({
    accountNumber: {type: String, required: true},
    cardUser: {type: Schema.Types.ObjectId, ref: "CommuterModel"},
    currentAmount: {type: Number, required: true},
    dateCreated: Date
}, {collection: 'charliecards'});

export default CharlieCardSchema;