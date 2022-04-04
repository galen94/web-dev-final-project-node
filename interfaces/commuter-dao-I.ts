import Commuter from "../models/commuter";

/**
 * @file Declares API for Users related data access object methods
 */
export default interface CommuterDaoI {
    //need likes and follows collections
    // userLikesConductor (cid: string): Promise<any>;
    // userUnlikesConductor (commuter: Commuter): Promise<User>;
    // userFollowsUser (cid: string, commuter: Commuter): Promise<any>;
    // userUnfollowsUser (cid: string): Promise<any>;
    createCommuter(commuter: Commuter): Promise<Commuter>;
    updateCommuter(cid: string, commuter: Commuter): Promise<any>;
    deleteCommuter(cid: string): Promise<any>;
    findCommuterById(cid: string): Promise<Commuter>;
    findAllCommuters(): Promise<Commuter[]>;
    deleteCommutersByUsername(username: string): Promise<any>;
}