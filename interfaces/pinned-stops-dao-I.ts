import PinnedStop from "../models/pinned-stop";

/**
 * @file Declares API for PostLikes related data access object methods
 */
export default interface PinnedStopDaoI {
    findAllPinnedStopsByUser (userId: string): Promise<PinnedStop[]>;
    findOnePinnedStopsByUser (pid: string): Promise<any>;
    pinStop (routeId: string, stopId: string, userId: string): Promise<PinnedStop>;
    unpinStop (pid: string): Promise<any>;
};