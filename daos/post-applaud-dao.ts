import PostApplaudDaoI from "../interfaces/post-applaud-dao-I";
import PostApplaudModel from "../mongoose/post-applaud-model";
import PostApplaud from "../models/post-applaud";

export default class PostApplaudDao implements PostApplaudDaoI {
    private static postApplaudDao: PostApplaudDao | null = null;

    public static getInstance = (): PostApplaudDao => {
        if(PostApplaudDao.postApplaudDao === null) {
            PostApplaudDao.postApplaudDao = new PostApplaudDao();
        }
        return PostApplaudDao.postApplaudDao;
    }

    private constructor() {}

    findAllUsersThatApplaudedPost = async (pid: string): Promise<PostApplaud[]> =>
        PostApplaudModel
            .find({post: pid})
            .populate("likedBy")
            .exec();

    findAllPostsApplaudedByUser = async (uid: string): Promise<PostApplaud[]> =>
        PostApplaudModel
            .find({applaudedBy: uid})
            .populate({
                path: "post",
                populate: {
                    path: "postedBy"
                }
            })
            .exec()

    userRemovesApplaud = async (pid: string, uid: string): Promise<any> =>
        PostApplaudModel.deleteOne(
            {
                post: pid,
                applaudedBy: uid
            }
        );

    userApplaudsPost = async (pid: string, uid: string): Promise<PostApplaud> =>
        PostApplaudModel.create(
            {
                post: pid,
                applaudedBy: uid
            }
        );

    countApplauds = async (pid: string): Promise<any> =>
        PostApplaudModel.count(
            {
                post: pid
            }
        );

    findUserApplaudsPost = async (uid: string, pid: string): Promise<any> =>
        PostApplaudModel.findOne(
            {
                post: pid,
                applaudedBy: uid
            }
        );

}