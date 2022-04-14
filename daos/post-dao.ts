import PostModel from "../mongoose/post-model";
import Post from "../models/post";
import PostDaoI from "../interfaces/post-dao-I";
import User from "../models/user";

export default class PostDao implements PostDaoI {
    private static postDao: PostDao | null = null;

    public static getInstance = () : PostDao => {
        if (PostDao.postDao === null ) {
            PostDao.postDao = new PostDao();
        }
        return PostDao.postDao;
    }

    private constructor() {}

    userPostsAPost = async (post: Post): Promise<Post> =>
        PostModel.create(post)

    userUpdatesAPost = async (pid: string, user: User): Promise<any> =>
        PostModel.updateOne(
            {_id: pid},
            {$set: user}
        );




    userDeletesAPost = async (pid: string): Promise<any> =>
        PostModel.deleteOne({_id: pid});

    findPostById = async (pid: string): Promise<any> =>
        PostModel.findOne({_id: pid})
            .populate("post")
            .exec();


    findPosts = async (): Promise<Post[]> =>
        PostModel.find();


    updateLikes = async (pid: string, post: Post): Promise<any> =>
        PostModel.find({_id: pid},
            {$set: {"likes": (post.likes+1)}}
        );

    updateApplauds = async (pid: string, post: Post): Promise<any> =>
        PostModel.find({_id: pid},
            {$set: {"likes": (post.applauds+1)}});
}