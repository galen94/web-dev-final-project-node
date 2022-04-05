/**
 * @file Implements mongoose schema to CRUD to represent administrators.
 */

import mongoose, {Schema} from "mongoose";
import Admin from "./admin-model";

// TODO +Galen -- intelliJ is giving me an error for <Admin> saying it should be 'typeOf<Admin>'... should i suppress?
// @ts-ignore
const AdminSchema = new mongoose.Schema<Admin>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    name: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    // TODO +Galen -- since TS doesn't support int's, I think this should just be left as a string -- thoughts?
    yearsAtMBTA: String,
}, {collection: 'administrators'});
export default AdminSchema;