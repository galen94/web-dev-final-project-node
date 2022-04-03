/**
 * @file Implements mongoose schema to CRUD to represent users.
 */
import mongoose, {Schema} from "mongoose";
import Commuter from "../models/commuter";

const CommuterSchema = new mongoose.Schema<Commuter>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    name: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    dateOfBirth: Date,
    homeStop: {type: String},
    charlieCard: {type: Schema.Types.ObjectId, ref: "CharlieCardModel"},
}, {collection: 'commuters'});

export default CommuterSchema;

