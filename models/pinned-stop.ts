/**
 * @file Declares PinnedStop data type representing relationship between
 * users and stops, as in user pins a stop
 */
import Commuter from "../models/commuter";

/**
 * @typedef PinnedStop Represents pinned relationship between a commuter and a stop,
 * as in a commuter pins a stop
 * @property {string} stop
 * @property {Commuter} pinnedBy
 */
export default interface PinnedStop {
    stop: string,
    pinnedBy: Commuter
};