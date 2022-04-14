import Post from "../models/post";
import User from "../models/user";

/**
 * @file Declares API for Users related data access object methods
 */
export default interface PostDaoI {
    userPostsAPost (post: Post): Promise<Post>;
    userUpdatesAPost (pid: string, user: User): Promise<any>;
    updateLikes (pid: string, post: Post): Promise<any>;
    updateApplauds(pid: string, post: Post) : Promise<any>;
    userDeletesAPost (pid: string): Promise<any>;
    findPostById(pid: string): Promise<any>;
    findPosts(): Promise<Post[]>;

}