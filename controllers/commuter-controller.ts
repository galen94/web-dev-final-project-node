/**
 * @file Controller RESTful Web service API for commuters resource
 */
import Commuter from "../models/commuter";
import {Express, Request, Response} from "express";
import CommuterControllerI from "../interfaces/commuter-controller-I";
import CommuterDao from "../daos/commuter-dao";

/**
 * @class CommuterController Implements RESTful Web service API for commuters resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/commuters to create a new user instance</li>
 *     <li>GET /api/commuters to retrieve all the commuters instances</li>
 *     <li>GET /api/commuters/:uid to retrieve an individual commuters instance </li>
 *     <li>PUT /api/commuters/:uid to modify an individual commuters instance </li>
 *     <li>DELETE /api/commuters/:uid to remove a particular commuters instance</li>
 *     <li>DELETE /api/commuters to remove all the commuters instances</li>
 * </ul>
 * @property {CommuterDao} commuterDao Singleton DAO implementing user CRUD operations
 * @property {CommuterController} commuterController Singleton controller implementing
 * RESTful Web service API
 */

export default class CommuterController implements CommuterControllerI {
    private static commuterDao: CommuterDao = CommuterDao.getInstance();
    private static commuterController: CommuterController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns CommuterController
     */
    public static getInstance = (app: Express): CommuterController => {
        if(CommuterController.commuterController === null) {
            CommuterController.commuterController = new CommuterController();

            app.post("/api/commuters", CommuterController.commuterController.createCommuter);
            app.get("/api/commuters", CommuterController.commuterController.findAllCommuters);
            app.get("/api/commuters/:cid", CommuterController.commuterController.findCommuterById);
            app.put("/api/commuters/:cid", CommuterController.commuterController.updateCommuter);
            app.delete("/api/commuters/:cid", CommuterController.commuterController.deleteCommuter);
            app.delete("/api/users/username/:username/delete", CommuterController.commuterController.deleteCommutersByUsername);
        }

        return CommuterController.commuterController;
    }

    private constructor() {}

    /**
     * Retrieves all commuters from the database and returns an array of commuters.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the commuters objects
     */
    findAllCommuters = (req: Request, res: Response) =>
        CommuterController.commuterDao.findAllCommuters().then((commuters: Commuter[]) => res.json(commuters));

    /**
     * Retrieves the user by their primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
    findCommuterById = (req: Request, res: Response) =>
        CommuterController.commuterDao.findCommuterById(req.params.cid).then((commuter: Commuter) => res.json(commuter));

    /**
     * Creates a new user instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
    createCommuter = (req: Request, res: Response) =>
        CommuterController.commuterDao.createCommuter(req.body).then((commuter: Commuter) => res.json(commuter));

    /**
     * Modifies an existing user instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    updateCommuter = (req: Request, res: Response) =>
        CommuterController.commuterDao.updateCommuter(req.params.cid, req.body).then(status => res.json(status));

    /**
     * Removes a user instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteCommuter = (req: Request, res: Response) =>
        CommuterController.commuterDao.deleteCommuter(req.params.cid).then(status => res.send(status));


    /**
     * Removes a user instance from the database by username
     * @param {Request} req Represents request from client, including path
     * parameter username identifying the username of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteCommutersByUsername = (req: Request, res: Response) => {
        CommuterController.commuterDao.deleteCommutersByUsername(req.params.username).then(status => res.send(status));
    }
}