/**
 * @file Implements mongoose schema to CRUD to represent conductors.
 */
import mongoose, {Schema} from "mongoose";
import Conductor from "./conductor-model";

// TODO +Galen again with the suppression error?
// @ts-ignore
const ConductorSchema = new mongoose.Schema<Conductor>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    name: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    yearsAsConductor: String,
    // TODO +Galen I think these are fine as a string but might wanna change?
    currentRouteToConduct: String,
    favoriteRouteToConduct: String,
    favoritedByUsers: {type: Array, required: false, default: `[]`},
    // TODO +Galen the reviews could be formatted into a 'posts'-like structure like with Tuiter.. what do you think?
    reviewsFromUsers: String,
}, {collection: 'conductors'});

export default ConductorSchema;