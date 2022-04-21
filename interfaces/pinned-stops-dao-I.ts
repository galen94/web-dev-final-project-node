import PinnedStop from "../models/pinned-stop";

/**
 * @file Declares API for PostLikes related data access object methods
 */
export default interface PinnedStopDaoI {
    findAllPinnedStopsByUser (userId: string): Promise<PinnedStop[]>;
    findOnePinnedStopsByUser (pid: string): Promise<any>;
    pinExistsAlready (routeType: string, routeId: string, stopId: string, userId: string): Promise<any>;
    pinStop (routeType: string, routeId: string, routeName: string, stopId: string, stopName: string, userId: string): Promise<PinnedStop>;
    unpinStop (pid: string): Promise<any>;
};