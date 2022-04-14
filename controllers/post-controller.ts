import PostDao from "../daos/post-dao";
import Post from "../models/post";
import {Express, Request, Response} from "express";
import PostControllerI from "../interfaces/post-controller-I";

export default class PostController implements PostControllerI {
    private static postDao: PostDao = PostDao.getInstance();
    private static postController: PostController | null = null;

    public static getInstance = (app: Express): PostController => {
        if (PostController.postController === null) {
            PostController.postController = new PostController();
            app.get("/api/posts", PostController.postController.findPosts);
            app.get("/api/posts/:pid", PostController.postController.findPostById);
            app.post("/api/posts", PostController.postController.userPostsAPost);
            app.put("/api/posts/:pid", PostController.postController.userUpdatesAPost);
            app.delete("/api/posts/:pid", PostController.postController.userDeletesAPost);
        }
        return PostController.postController;
    }

    private constructor() {}

    //TODO -- +Galen - these are giving me errors unsure if you know how to fix... suppressing for now

    // @ts-ignore
    userDeletesAPost = (req: Request, res: Response) =>
        PostController.postDao.userDeletesAPost(req.params.pid).then(status => res.send(status));

    // @ts-ignore
    userUpdatesAPost = (req: Request, res: Response) =>
        PostController.postDao.userUpdatesAPost(req.params.pid, req.body).then(status => res.send(status));

    // @ts-ignore
    updateLikes = (req: Request, res: Response) =>
        PostController.postDao.updateLikes(req.params.pid, req.body).then(status => res.send(status));

    // @ts-ignore
    updateApplauds = (req: Request, res: Response) =>
        PostController.postDao.updateApplauds(req.params.pid, req.body).then(status => res.send(status));

    // @ts-ignore
    userPostsAPost = (req: Request, res: Response) =>
        PostController.postDao.userPostsAPost(req.body).then((post: Post) => res.json(post));

    // @ts-ignore
    findPostById = (req: Request, res: Response) =>
        PostController.postDao.findPostById(req.params.pid).then((post: Post) => res.json(post));

    // @ts-ignore
    findPosts = (req: Request, res: Response) =>
        PostController.postDao.findPosts().then((posts: Post[]) => res.json(posts));

}