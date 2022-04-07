/**
 * @file Implements mongoose schema to CRUD to represent administrators.
 */

import mongoose, {Schema} from "mongoose";
import Admin from "../models/admin";

const AdminSchema = new mongoose.Schema<Admin>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: String,
    email: {type: String, required: true},
    yearsAtMBTA: Number,
}, {collection: 'administrators'});
export default AdminSchema;