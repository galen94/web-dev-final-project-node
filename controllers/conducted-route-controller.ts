/**
 * @file Controller RESTful Web service API for conducted route resource
 */
import ConductedRouteDao from "../daos/conducted-route-dao";
import ConductedRoute from "../models/conducted-route";
import {Express, Request, Response} from "express";
import ConductedRouteControllerI from "../interfaces/conducted-route-controller-I";

/**
 * @class ConductedRouteController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/conductedRoutes/user/:uid to retrieve a conducted route instance by associated user</li>
 *     <li>POST /api/conductedRoutes to associate a route with a user by either updating a document if user already
 *              in collection or creating a new document otherwise</li>
 *     <li>DELETE /api/conductedRoutes/:rid to remove a particular conducted route instance</li>
 * </ul>
 * @property {ConductedRouteDao} conductedRouteDao Singleton DAO implementing conducted route CRUD operations
 * @property {ConductedRouteController} conductedRouteController Singleton controller implementing
 * RESTful Web service API
 */
export default class ConductedRouteController implements ConductedRouteControllerI {
    private static conductedRouteDao: ConductedRouteDao = ConductedRouteDao.getInstance();
    private static conductedRouteController: ConductedRouteController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns ConductedRouteController
     */
    public static getInstance = (app: Express): ConductedRouteController => {
        if (ConductedRouteController.conductedRouteController === null) {
            ConductedRouteController.conductedRouteController = new ConductedRouteController();

                app.get('/api/conductedRoutes/user/:uid', ConductedRouteController.conductedRouteController.findRouteByUserId);
                app.post('/api/conductedRoutes', ConductedRouteController.conductedRouteController.conductRoute);
                app.delete('/api/conductedRoutes/:rid', ConductedRouteController.conductedRouteController.deleteRoute);

        }

        return ConductedRouteController.conductedRouteController;
    }

    private constructor() {}

    /**
     * Retrieves a conducted route by its user field
     * @param {Request} req Represents request from client, including path
     * parameter username identifying the id of the user
     * @param {Response} res Represents response to client, including the document associated with the user
     */
    findRouteByUserId = (req: Request, res: Response) =>
        ConductedRouteController.conductedRouteDao.findRouteByUserId(req.params.uid).then((route: ConductedRoute) => res.json(route));

    /**
     * Creates a document associating a route and a user if the user is not in a current document, otherwise updates
     * the document associated with the given user to be associated with the new route
     * @param {Request} req Represents request from client, including body which is the document to be created or
     * replaced
     * @param {Response} res Represents response to client, including the newly updated or created document
     */
    conductRoute = async (req: Request, res: Response) => {
        const uid = req.body.user;
        const current_route = await ConductedRouteController.conductedRouteDao.findRouteByUserId(uid)
        if (current_route === null) {
            ConductedRouteController.conductedRouteDao.createRoute(req.body).
                then((route: ConductedRoute) => res.json(route));
        } else {
            await ConductedRouteController.conductedRouteDao.updateRoute(uid, req.body);
            ConductedRouteController.conductedRouteDao.findRouteByUserId(uid).
                then((route: ConductedRoute) => res.json(route));
        }
    }

    /**
     * Removes a conducted route instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter rid identifying the primary key of the conducted route to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a conducted route was successful or not
     */
    deleteRoute = (req: Request, res: Response) =>
        ConductedRouteController.conductedRouteDao.deleteRoute(req.params.rid).then(status => res.send(status));

}