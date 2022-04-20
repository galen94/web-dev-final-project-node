/**
 * @file Declares PinnedStop data type representing relationship between
 * users and stops, as in user pins a stop
 */
import User from "../models/user";

/**
 * @typedef PinnedStop Represents pinned relationship between a user and a stop,
 * as in a user pins a stop
 * @property {string} stop
 * @property {User} pinnedBy
 */
export default interface PinnedStop {
    stop: string,
    route: string,
    pinnedBy: User
};