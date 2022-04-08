/**
 * @file Implements mongoose model to CRUD
 * documents in the postLikes collection
 */
import mongoose from "mongoose";
import PinnedStopSchema from "./pinned-stop-schema";

const PinnedStopModel = mongoose.model("PinnedStopModel", PinnedStopSchema);
export default PinnedStopModel;