import PostApplaud from "../models/post-applaud";

export default interface PostApplaudDaoI {
    findAllUsersThatApplaudedPost (pid: string): Promise<PostApplaud[]>;
    findAllPostsApplaudedByUser (uid: string): Promise<PostApplaud[]>;
    userRemovesApplaud(pid: string, uid: string): Promise<any>;
    userApplaudsPost (pid: string, uid: string): Promise<PostApplaud>;
    countApplauds (pid: string): Promise<any>;
    findUserApplaudsPost (uid: string, pid: string): Promise<any>;
}