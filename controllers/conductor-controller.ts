// unfinished
/**
 * @file Controller RESTful Web service API for users resource
 */
import Conductor from "../models/conductor";
import {Express, Request, Response} from "express";
import ConductorControllerI from "../interfaces/conductor-controller-I";
import ConductorDao from "../daos/conductor-dao";

/**
 * @class ConductorController Implements RESTful Web service API for conductor resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/conductors to create a new conductor instance</li>
 *     <li>GET /api/conductors to retrieve all the conductors instances</li>
 *     <li>GET /api/conductors/:coid to retrieve an individual conductor instance </li>
 *     <li>PUT /api/conductors/:coid to modify an individual conductor instance </li>
 *     <li>DELETE /api/conductors/:coid to remove a particular conductor instance</li>
 *     <li>DELETE /api/conductors to remove all the conductors instances</li>
 * </ul>
 * @property {ConductorDao} conductorDao Singleton DAO implementing conductor CRUD operations
 * @property {ConductorController} condcutorController Singleton controller implementing
 * RESTful Web service API
 */
export default class ConductorController implements ConductorControllerI {
    private static conductorDao: ConductorDao = ConductorDao.getInstance();
    private static conductorController: ConductorController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns ConductorController
     */
    public static getInstance = (app: Express): ConductorController => {
        if (ConductorController.conductorController === null) {
            ConductorController.conductorController = new ConductorController();

            app.post("/api/conductors", ConductorController.conductorController.createConductor);
            app.get("/api/conductors", ConductorController.conductorController.findAllConductors);
            app.get("/api/conductors/:coid", ConductorController.conductorController.findConductorById);
            app.put("/api/conductors/:coid", ConductorController.conductorController.updateConductor);
            app.delete("/api/conductors/:coid", ConductorController.conductorController.deleteConductor);
            app.delete("/api/conductors/username/:username/delete", ConductorController.conductorController.deleteConductorsByUsername);
        }
        return ConductorController.conductorController;
    }

    private constructor() {
    }

    /**
     * Retrieves all conductors from the database and returns an array of conductors.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the conductors objects
     */
    findAllConductors = (req: Request, res: Response) =>
        ConductorController.conductorDao.findAllConductors().then((conductors: Conductor[]) => res.json(conductors));

    /**
     * Retrieves the conductors by their primary key
     * @param {Request} req Represents request from client, including path
     * parameter aid identifying the primary key of the conductors to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the conductors that matches the admin ID
     */
    findConductorById = (req: Request, res: Response) =>
        ConductorController.conductorDao.findConductorById(req.params.coid).then((conductors: Conductor) => res.json(conductors));

    /**
     * Creates a new conductor instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new conductor to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new conductor that was inserted in the
     * database
     */
    createConductor = (req: Request, res: Response) =>
        ConductorController.conductorDao.createConductor(req.body).then((conductors: Conductor) => res.json(conductors));

    /**
     * Modifies an existing conductor instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the conductor to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a conductor was successful or not
     */
    updateConductor = (req: Request, res: Response) =>
        ConductorController.conductorDao.updateConductor(req.params.coid, req.body).then(status => res.send(status));

    /**
     * Removes a conductor instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the conductor to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a conductor was successful or not
     */
    deleteConductor = (req: Request, res: Response) =>
        ConductorController.conductorDao.deleteConductor(req.params.coid).then(status => res.send(status));

    /**
     * Removes a conductor instance from the database by username
     * @param {Request} req Represents request from client, including path
     * parameter username identifying the username of the conductor to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a conductor was successful or not
     */
    deleteConductorsByUsername = (req: Request, res: Response) =>
        ConductorController.conductorDao.deleteConductorsByUsername(req.params.username).then(status => res.send(status));

}