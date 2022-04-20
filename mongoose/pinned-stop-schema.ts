/**
 * @file Create PinnedStop Schema
 */
import mongoose, {Schema} from "mongoose";
import PinnedStop from "../models/pinned-stop";

const PinnedStopSchema = new mongoose.Schema<PinnedStop>({
    stop: {type: String, required: true},
    route: {type: String, required: true},
    pinnedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "pinnedStops"});
export default PinnedStopSchema;
