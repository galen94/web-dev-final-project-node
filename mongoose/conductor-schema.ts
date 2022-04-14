/**
 * @file Implements mongoose schema to CRUD to represent conductors.
 */
import mongoose, {Schema} from "mongoose";
import Conductor from "../models/conductor";

const ConductorSchema = new mongoose.Schema<Conductor>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: String,
    email: {type: String, required: true},
    yearsAsConductor: Number,
    currentRouteToConduct: String,
    favoriteRouteToConduct: String,
}, {collection: 'conductors'});

export default ConductorSchema;