/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/follow-dao";
import FollowControllerI from "../interfaces/follow-controller-I";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/follows/:uid2 to record when a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid/unfollows/:uid2 to delete a record of a user folllowing another user
 *     </li>
 *     <li>GET /api/users/:uid/follows to find all other users the user follows
 *     </li>
 *     <li>GET /api/users/:uid/followedBy to find all others that follow the user
 *     </li>
 *     <li>GET /api/follows to retrieve all follows between users
 *     </li>
 *     <li>GET /api/follows/:fid to retrieve a single follow between users
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid/follows/:uid2", FollowController.followController.followUser);
            app.delete("/api/users/:uid/unfollows/:uid2", FollowController.followController.unfollowUser);
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersThatUserIsFollowing);
            app.get("/api/users/:uid/followedBy", FollowController.followController.findAllUserFollowers);
            app.get("/api/follows", FollowController.followController.findAllFollowsBetweenUsers);
            app.get("/api/follows/:fid", FollowController.followController.findFollowById);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * To record when a user follows another user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user being followed and uid2 representing the user following
     * @param {Response} res Represents response to client, including the
     * follow body in JSON format
     */
    followUser = (req: Request, res: Response) =>
        FollowController.followDao.followUser(req.params.uid, req.params.uid2)
            .then(follows => res.json(follows));

    /**
     * To delete a record of when a user follows another user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user being followed and uid2 representing the user following
     * @param {Response} res Represents response to client, delete status
     */
    unfollowUser = (req: Request, res: Response) =>
        FollowController.followDao.unfollowUser(req.params.uid, req.params.uid2)
            .then(status => res.send(status));

    /**
     * Retrieves all users that user is following from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user that follows other users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows objects where user uid
     * is the follower
     */
    findAllUsersThatUserIsFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserIsFollowing(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that follow the user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user that others follow
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows objects where user uid
     * is the user
     */
    findAllUserFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllUserFollowers(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all follows objects from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including all follows
     * objects, all instances of users following another user, in JSON formatted array
     */
    findAllFollowsBetweenUsers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowsBetweenUsers()
            .then(follows => res.json(follows));

    /**
     * Retrieves one specific follows object from the database
     * @param {Request} req Represents request from client, including the path
     * parameter fid representing the follows object, instance of a follow
     * @param {Response} res Represents response to client, including one follows
     * object in JSON format
     */
    findFollowById = (req: Request, res: Response) =>
        FollowController.followDao.findFollowById(req.params.fid)
            .then(follows => res.json(follows));

};