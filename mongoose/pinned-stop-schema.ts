/**
 * @file Create PinnedStop Schema
 */
import mongoose, {Schema} from "mongoose";
import PinnedStop from "../models/pinned-stop";

const PinnedStopSchema = new mongoose.Schema<PinnedStop>({
    routeType: {type: String, required: true},
    stopId: {type: String, required: true},
    stopName: {type: String, required: true},
    routeId: {type: String, required: true},
    routeName: {type: String, required: true},
    pinnedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "pinnedStops"});
export default PinnedStopSchema;
