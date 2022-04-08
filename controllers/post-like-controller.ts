/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import PostLikeDao from "../daos/post-like-dao";
import PostLikeControllerI from "../interfaces/post-like-controller-I";
import PostDao from "../daos/post-dao";

/**
 * @class PostLikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/commuters/:cid/likespost to retrieve all the post liked by a user
 *     </li>
 *     <li>GET /api/posts/:pid/likespost to retrieve all users that liked a post
 *     </li>
 *     <li>PUT /api/commuters/:cid/toggleslikespost/:pid to record that a user likes a post
 *     </li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class PostLikeController implements PostLikeControllerI {
    private static postLikeDao: PostLikeDao = PostLikeDao.getInstance();
    private static postDao: PostDao = PostDao.getInstance();
    private static postLikeController: PostLikeController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return PostController
     */
    public static getInstance = (app: Express): PostLikeController => {
        if(PostLikeController.postLikeController === null) {
            PostLikeController.postLikeController = new PostLikeController();
            app.get("/api/commuters/:cid/likespost", PostLikeController.postLikeController.findAllPostsLikedByUser);
            app.get("/api/posts/:pid/likespost", PostLikeController.postLikeController.findAllUsersThatLikedPost);
            app.put("/api/commuters/:cid/toggleslikespost/:pid", PostLikeController.postLikeController.userTogglesPostLikes);
        }
        return PostLikeController.postLikeController;
    }

    private constructor() {}

    /**
     * Retrieves all users that liked a post from the database
     * @param {Request} req Represents request from client, including the path
     * parameter pid representing the liked post
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatLikedPost = (req: Request, res: Response) =>
        PostLikeController.postLikeDao.findAllUsersThatLikedPost(req.params.pid)
            .then(postLikes => res.json(postLikes));

    /**
     * Retrieves all posts liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the posts
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the post objects that were liked
     */
    findAllPostsLikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        PostLikeController.postLikeDao.findAllPostsLikedByUser(userId)
            .then(postLikes => {
                const likesNonNullPosts = postLikes.filter(postLike => postLike.post);
                const postsFromLikes = likesNonNullPosts.map(postLike => postLike.post);
                res.json(postsFromLikes);
            });
    }


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and pid representing the user that is liking the post
     * and the post being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userTogglesPostLikes = async (req: Request, res: Response) => {
        const postLikeDao = PostLikeController.postLikeDao;
        const postDao = PostLikeController.postDao;
        const uid = req.params.uid;
        const pid = req.params.pid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedPost = await postLikeDao.findUserLikesPost(userId, pid);
            const howManyLikedPost = await postLikeDao.countHowManyLikedPost(pid);

            let post = await postDao.findPostById(pid);
            if (userAlreadyLikedPost) {
                await postLikeDao.userUnlikesPost(userId, pid);
                post.stats.likes = howManyLikedPost - 1;
            } else {
                await postLikeDao.userLikesPost(userId, pid);
                post.stats.likes = howManyLikedPost + 1;
            };
            await postDao.updateLikes(pid, post.stats);

            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
};