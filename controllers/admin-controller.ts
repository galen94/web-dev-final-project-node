/**
 * @file Controller RESTful Web service API for users resource
 */

import Admin from "../models/admin";
import {Express, Request, Response} from "express";
import AdminControllerI from "../interfaces/admin-controller-I";
import AdminDao from "../daos/admin-dao"

/**
 * @class AdminController Implements RESTful Web service API for admin resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/admins to create a new admin instance</li>
 *     <li>GET /api/admins to retrieve all the admin instances</li>
 *     <li>GET /api/admins/:aid to retrieve an individual admin instance </li>
 *     <li>PUT /api/admins/:aid to modify an individual admin instance </li>
 *     <li>DELETE /api/admins/:aid to remove a particular admin instance</li>
 *     <li>DELETE /api/admins to remove all the admin instances</li>
 * </ul>
 * @property {AdminDao} adminDao Singleton DAO implementing admin CRUD operations
 * @property {AdminController} adminController Singleton controller implementing
 * RESTful Web service API
 */
export default class AdminController implements AdminControllerI {
    private static adminDao: AdminDao = AdminDao.getInstance();
    private static adminController: AdminController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns AdminController
     */
    public static getInstance = (app: Express): AdminController => {
        if (AdminController.adminController === null) {
            AdminController.adminController = new AdminController();

            app.post("/api/admins", AdminController.adminController.createAdmin);
            app.get("/api/admins", AdminController.adminController.findAllAdmins);
            app.get("/api/admins/:aid", AdminController.adminController.findAdminById);
            app.put("/api/admins/:aid", AdminController.adminController.updateAdmin);
            app.delete("/api/admins/:aid", AdminController.adminController.deleteAdmin);
            app.delete("/api/admins/username/:username/delete", AdminController.adminController.deleteAdminsByUsername);
        }
        return AdminController.adminController;
    }

    private constructor() {
    }

    /**
     * Retrieves all admins from the database and returns an array of admins.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllAdmins = (req: Request, res: Response) =>
        AdminController.adminDao.findAllAdmins().then((admins: Admin[]) => res.json(admins));


    /**
     * Retrieves the admin by their primary key
     * @param {Request} req Represents request from client, including path
     * parameter aid identifying the primary key of the admin to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the admin that matches the admin ID
     */
    findAdminById = (req: Request, res: Response) =>
        AdminController.adminDao.findAdminById(req.params.aid).then((admin: Admin) => res.json(admin));

    /**
     * Creates a new admin instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new admin to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new admin that was inserted in the
     * database
     */
    createAdmin = (req: Request, res: Response) =>
        AdminController.adminDao.createAdmin(req.body).then((admin: Admin) => res.json(admin));

    /**
     * Modifies an existing admin instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the admin to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a admin was successful or not
     */
    updateAdmin = (req: Request, res: Response) =>
        AdminController.adminDao.updateAdmin(req.params.aid, req.body).then(status => res.json(status));

    /**
     * Removes an admin instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the admin to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a admin was successful or not
     */
    deleteAdmin = (req: Request, res: Response) =>
        AdminController.adminDao.deleteAdmin(req.params.aid).then(status => res.send(status));

    /**
     * Removes an admin instance from the database by username
     * @param {Request} req Represents request from client, including path
     * parameter username identifying the username of the admin to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a admin was successful or not
     */
    deleteAdminsByUsername = (req: Request, res: Response) =>
        AdminController.adminDao.deleteAdminsByUsername(req.params.username).then(status => res.send(status));


}