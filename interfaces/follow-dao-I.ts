import Follow from "../models/follow";

export default interface FollowDao {
    followUser(uid: string, uid2: string): Promise<Follow>;
    unfollowUser(uid: string, uid2: string): Promise<any>;
    findAllUserFollowers(uid: string): Promise<Follow[]>;
    findAllFollowsByUser(uid: string): Promise<Follow[]>;
    findAllFollowsBetweenUsers(): Promise<Follow[]>;
    findFollowById(fid: string): Promise<any>;
    followExistsAlready (uid: string, uid2: string): Promise<any>;

}