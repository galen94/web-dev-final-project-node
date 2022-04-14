import {Express, Request, Response} from "express";
import PostApplaudDao from "../daos/post-applaud-dao";
import PostApplaudControllerI from "../interfaces/post-applaud-controller-I";
import PostDao from "../daos/post-dao";
import PostApplaud from "../models/post-applaud";


/**
 * @class PostApplaudController Implements RESTful Web service API for applauds resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/commuters/:cid/applaudspost to retrieve all the post applauds by a user
 *     </li>
 *     <li>GET /api/posts/:pid/applaudspost to retrieve all users that applauds a post
 *     </li>
 *     <li>PUT /api/commuters/:cid/togglesapplaudspost/:pid to record that a user applauds a post
 *     </li>
 * </ul>
 * @property {PostApplaudDao} applaudDao Singleton DAO implementing applauds CRUD operations
 * @property {PostApplaudController} ApplaudController Singleton controller implementing
 * RESTful Web service API
 */
export default class PostApplaudController implements PostApplaudControllerI {
    private static postApplaudDao: PostApplaudDao = PostApplaudDao.getInstance();
    //TODO postDao stuff ? ts ignore for now
    // @ts-ignore
    private static postDao: PostDao = PostDao.getInstance();
    private static postApplaudController: PostApplaudController | null = null;

    public static getInstance = (app: Express): PostApplaudController => {
        if (PostApplaudController.postApplaudController === null) {
            PostApplaudController.postApplaudController = new PostApplaudController();
            app.get("/api/commuters/:cid/applaudspost", PostApplaudController.postApplaudController.findAllPostsApplaudedByUser);
            app.get("/api/posts/:pid/applaudspost", PostApplaudController.postApplaudController.findAllUsersThatApplaudedPost);
            app.put("/api/commuters/:cid/togglesapplaudspost/:pid", PostApplaudController.postApplaudController.userTogglesPostApplauds);
        }
        return PostApplaudController.postApplaudController;
    }

    private constructor() {}

    findAllPostsApplaudedByUser = (req: Request, res: Response) =>{
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        PostApplaudController.postApplaudDao.findAllPostsApplaudedByUser(userId)
            .then(postApplauds => {
                const applaudsNonNullPosts = postApplauds.filter(postApplaud => postApplaud.post);
                const postsFromApplauds = applaudsNonNullPosts.map(postApplaud => postApplaud.post);
                res.json(postsFromApplauds);
            })


    }



    findAllUsersThatApplaudedPost =(req: Request, res: Response) =>
        PostApplaudController.postApplaudDao.findAllUsersThatApplaudedPost(req.params.pid)
            .then(postApplauds => res.json(postApplauds));

    userTogglesPostApplauds = async (req: Request, res: Response) => {
        const postApplaudDao = PostApplaudController.postApplaudDao;
        const postDao = PostApplaudController.postDao;
        const uid = req.params.uid;
        const pid = req.params.pid;
        //@ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        try {
            const userAlreadyApplaudedPost = await postApplaudDao.findUserApplaudsPost(userId, pid);
            const howManyApplaudedPost = await postApplaudDao.countApplauds(pid);

            let post = await postDao.findPostById(pid);
            if(userAlreadyApplaudedPost) {
                await postApplaudDao.userRemovesApplaud(userId, pid);
                post.stats.applauds = howManyApplaudedPost - 1;
            }
            else {
                await postApplaudDao.userApplaudsPost(userId, pid);
                post.stats.applauds = howManyApplaudedPost + 1;
            }
            await postDao.updateApplauds(pid, post.stats);

            res.send(200);
        } catch (e) {
            res.send(404)
        }
    }
}


