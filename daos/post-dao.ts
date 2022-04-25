import PostModel from "../mongoose/post-model";
import Post from "../models/post";
import PostDaoI from "../interfaces/post-dao-I";
import Stats from "../models/stats";

export default class PostDao implements PostDaoI {
    private static postDao: PostDao | null = null;

    public static getInstance = (): PostDao => {
        if (PostDao.postDao === null) {
            PostDao.postDao = new PostDao();
        }
        return PostDao.postDao;
    }

    private constructor() {}


    findAllPosts = async (): Promise<Post[]> => {
        return PostModel.find();
    }

    findPostById = async (pid: string): Promise<any> => {
        return PostModel.findById(pid);
    }

    userDeletesAPost = async (pid: string): Promise<any> => {
        return PostModel.deleteOne({_id: pid});
    }

    userPostsAPost = async (post: Post): Promise<Post> => {
        return PostModel.create(post);
    }

    userUpdatesAPost = async (pid: string, post: Post): Promise<any> => {
        return PostModel.updateOne({_id: pid}, {$set: post});
    }

    updateStats = async (pid: string, newStats: Stats): Promise<any> => {
        return PostModel.updateOne({_id: pid}, {$set: newStats});
    }
}