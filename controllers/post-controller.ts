import PostDao from "../daos/post-dao";
import Post from "../models/post";
import {Express, Request, Response} from "express";
import PostControllerI from "../interfaces/post-controller-I"

export default class PostController implements PostControllerI {
    private static postDao: PostDao = PostDao.getInstance();
    private static postController: PostController | null = null;

    public static getInstance = (app: Express): PostController => {
        if (PostController.postController === null) {
            PostController.postController = new PostController();

            app.post("/api/posts", PostController.postController.userPostsAPost);
            app.get("/api/posts/:pid", PostController.postController.findPostById);
            app.put("/api/posts/:pid", PostController.postController.userUpdatesAPost);
            app.put("/api/posts/:pid", PostController.postController.updateStats);
            app.delete("/api/posts/:pid", PostController.postController.userDeletesAPost);
        }

        return PostController.postController;
    }

    private constructor() {}


    findPostById = (req: Request, res: Response) =>
        PostController.postDao.findPostById(req.params.pid).then((post:Post) => res.json(post));

    // I'm unsure if this is correct
    updateStats = (req: Request, res: Response) =>
        PostController.postDao.updateStats(req.params.pid, req.body).then(status => res.send(status));


    userDeletesAPost = (req: Request, res: Response) =>
        PostController.postDao.userDeletesAPost(req.params.pid).then(status => res.send(status));

    userPostsAPost = (req: Request, res: Response) =>
        PostController.postDao.userPostsAPost(req.body).then((post: Post) => res.json(post));

    userUpdatesAPost = (req: Request, res: Response) =>
        PostController.postDao.userUpdatesAPost(req.params.pid, req.body).then(status => res.send(status));
}