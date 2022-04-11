/**
 * @file Implements model to represent conductor likes by commuters.
 */
import mongoose from "mongoose";
import Commuter from "./commuter";
import Conductor from "./conductor";

export default interface ConductorLike {
    conductor: Conductor,
    likedBy: Commuter
}