/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */

import FollowDaoI from "../interfaces/follow-dao-I";
import FollowModel from "../mongoose/follow-model";
import Follow from "../models/follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of follows
 * @property {FollowDao} followDao instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    /**
     * Uses FollowModel to retrieve all follows documents from follows collection
     * where the follower has the given uid
     * @param uid, user id of user who follows others
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllUsersThatUserIsFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({follower: uid})
            .populate("user")
            .populate("follower")
            .exec();


    /**
     * Uses FollowModel to retrieve all follows documents from follows collection
     * where the user has the given uid
     * @param uid, user id of user who has followers
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllUserFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({user: uid})
            .populate("user")
            .populate("follower")
            .exec();

    /**
     * Inserts follows instance into the database
     * @param uid user who followed another
     * @param uid2 user who was followed
     * @returns Promise To be notified when follow is inserted into the database
     */
    followUser = async (uid: string, uid2: string): Promise<Follow> =>
        FollowModel.create({follower: uid, user: uid2});

    /**
     * Deletes follows instance into the database
     * @param uid user who followed another
     * @param uid2 user who was followed
     * @returns Promise To be notified when follow is deleted from the database
     */
    unfollowUser = async (uid: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({follower: uid, user: uid2});

    /**
     * Uses FollowModel to retrieve all follows documents from follows collection
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllFollowsBetweenUsers = async(): Promise<Follow[]> =>
        FollowModel.find()
            .populate("user")
            .populate("follower")
            .exec();

    /**
     * Uses FollowModel to retrieve follows document from follows collection
     * where the follow has the given fid
     * @param fid, follow id
     * @returns Promise To be notified when the follow is retrieved from
     * database
     */
    findFollowById = async(fid: string): Promise<any> =>
        FollowModel.findById(fid)
            .populate("user")
            .populate("follower")
            .exec();

    /**
     * Uses FollowModel to determine if this follow already exits in the collection.
     * @param index index of the follow that is trying to be created.
     * @returns Promise 0 if follow does not exits, 1 if it does.
     */
    findFollow = async (index: {}): Promise<number> => {
        const result = FollowModel.find(index);
        console.log(result);
        return 0;
    }
}