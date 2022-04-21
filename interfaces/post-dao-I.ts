import Post from "../models/post";
import Stats from "../models/stats";

/**
 * @file Declares API for Users related data access object methods
 */
export default interface PostDaoI {
    userPostsAPost (post: Post): Promise<Post>;
    userUpdatesAPost (pid: string, post: Post): Promise<any>;
    updateStats (pid: string, newStats: Stats): Promise<any>;
    userDeletesAPost (pid: string): Promise<any>;
    findPostById(pid: string): Promise<any>;
}