/**
 * @file Implements model to represent conductor likes by commuters.
 */
import User from "./user";

export default interface ConductorLike {
    conductor: User,
    likedBy: User
}