/**
 * @file Create PinnedStop Schema
 */
import mongoose, {Schema} from "mongoose";
import PinnedStop from "../models/pinned-stop";

const PinnedStopSchema = new mongoose.Schema<PinnedStop>({
    stop: {type: String, required: true},
    pinnedBy: {type: Schema.Types.ObjectId, ref: "CommuterModel"},
}, {collection: "pinnedStops"});
export default PinnedStopSchema;
