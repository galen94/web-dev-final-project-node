import PostLike from "../models/post-like";

/**
 * @file Declares API for PostLikes related data access object methods
 */
export default interface PostLikeDaoI {
    findAllUsersThatLikedPost (pid: string): Promise<PostLike[]>;
    findAllPostsLikedByUser (uid: string): Promise<PostLike[]>;
    userUnlikesPost (pid: string, uid: string): Promise<any>;
    userLikesPost (pid: string, uid: string): Promise<PostLike>;
    countHowManyLikedPost (pid: string): Promise<PostLike[]>;
    findUserLikesPost (uid: string, pid: string): Promise<any>;
};