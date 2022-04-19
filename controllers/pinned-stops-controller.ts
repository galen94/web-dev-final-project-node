/**
 * @file Controller RESTful Web service API for users resource
 */
import {Express, Request, Response} from "express";
import PinnedStopsControllerI from "../interfaces/pinned-stops-controller-I";
import PinnedStopDao from "../daos/pinned-stops-dao";
import PinnedStop from "../models/pinned-stop";

/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users to create a new user instance</li>
 *     <li>GET /api/users/:uid to retrieve an individual user instance </li>
 *     <li>PUT /api/users/:uid to modify an individual user instance </li>
 *     <li>DELETE /api/users/:uid to remove a particular user instance</li>
 *     <li>GET /api/users/username/:username to find a user by their username </li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web service API
 */
export default class PinnedStopsController implements PinnedStopsControllerI {
    private static pinnedStopDao: PinnedStopDao = PinnedStopDao.getInstance();
    private static pinnedStopsController: PinnedStopsController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns UserController
     */
    public static getInstance = (app: Express): PinnedStopsController => {
        if(PinnedStopsController.pinnedStopsController === null) {
            PinnedStopsController.pinnedStopsController = new PinnedStopsController();

            app.get("/api/users/:uid/pins", PinnedStopsController.pinnedStopsController.findAllPinnedStopsByUser);
            app.get("/api/pins/:pid", PinnedStopsController.pinnedStopsController.findOnePinnedStopsByUser);
            app.post("/api/users/:uid/pins/:routeId/:stopId", PinnedStopsController.pinnedStopsController.pinStop);
            app.delete("/api/pins/:pid", PinnedStopsController.pinnedStopsController.unpinStop);
        }

        return PinnedStopsController.pinnedStopsController;
    }

    private constructor() {}

    /**
     * Retrieves the user by their primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
    findOnePinnedStopsByUser = (req: Request, res: Response) => {
        console.log("in controller1")
        // @ts-ignore
        const userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        if(userId === "me"){
            console.log("in controller2")
            res.sendStatus(503);
            return;
        }
        PinnedStopsController.pinnedStopDao.findOnePinnedStopsByUser(req.params.pid).then((pinnedStop: PinnedStop) => res.json(pinnedStop));

    }

    /**
     * Creates a new user instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
    findAllPinnedStopsByUser = (req: Request, res: Response) => {
        // @ts-ignore
        const userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        if(userId === "me"){
            res.sendStatus(503);
            return;
        }
        PinnedStopsController.pinnedStopDao.findAllPinnedStopsByUser(userId).then((pinnedStops: PinnedStop[]) => res.json(pinnedStops));
    }

    /**
     * Modifies an existing user instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    pinStop = (req: Request, res: Response) =>{
        // @ts-ignore
        const userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        if(userId === "me"){
            res.sendStatus(503);
            return;
        }

        PinnedStopsController.pinnedStopDao.pinStop(req.params.routeId, req.params.stopId, userId).then((pinnedStop: PinnedStop) => res.json(pinnedStop));


    }

    /**
     * Removes a user instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    unpinStop = (req: Request, res: Response) =>
        PinnedStopsController.pinnedStopDao.unpinStop(req.params.pid).then(status => res.send(status));

}

