/**
 * @file Implements mongoose model to CRUD documents in the administrators collection.
 */
import mongoose from "mongoose";
import AdminSchema from "./admin-schema";

const AdminModel = mongoose.model('AdminModel', AdminSchema);
export default AdminModel;