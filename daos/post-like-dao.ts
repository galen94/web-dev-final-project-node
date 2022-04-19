import PostLikeDaoI from "../interfaces/post-like-dao-I";
import PostLikeModel from "../mongoose/post-like-model";
import PostLike from "../models/post-like";

export default class PostLikeDao implements PostLikeDaoI {
    private static postLikeDao: PostLikeDao | null = null;

    public static getInstance = (): PostLikeDao => {
        if(PostLikeDao.postLikeDao === null) {
            PostLikeDao.postLikeDao = new PostLikeDao();
        }
        return PostLikeDao.postLikeDao;
    }
    private constructor() {}

    /**
     *
     * @param pid
     */
    findAllUsersThatLikedPost = async (pid: string): Promise<PostLike[]> =>
        PostLikeModel
            .find({post: pid})
            .populate("likedBy")
            .exec();

    /**
     *
     * @param uid
     */
    findAllPostsLikedByUser = async (uid: string): Promise<PostLike[]> =>
        PostLikeModel
            .find({likedBy: uid})
            .populate({
                path: "post",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     *
     * @param uid
     * @param pid
     */
    userLikesPost = async (uid: string, pid: string): Promise<PostLike> =>
        PostLikeModel.create({post: pid, likedBy: uid});

    /**
     *
     * @param uid
     * @param pid
     */
    findUserLikesPost = async (uid: string, pid: string): Promise<any> =>
        PostLikeModel.findOne({post: pid, likedBy: uid});

    /**
     *
     * @param uid
     * @param pid
     */
    userUnlikesPost = async (uid: string, pid: string): Promise<any> =>
        PostLikeModel.deleteOne({post: pid, likedBy: uid});

    /**
     *
     * @param pid
     */
    countHowManyLikedPost = async (pid: string): Promise<any> =>
        PostLikeModel.count({post: pid});
}