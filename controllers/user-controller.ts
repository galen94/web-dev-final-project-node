/**
 * @file Controller RESTful Web service API for users resource
 */
import UserDao from "../daos/user-dao";
import User from "../models/user";
import {Express, Request, Response} from "express";
import UserControllerI from "../interfaces/user-controller-I";

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
export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns UserController
     */
    public static getInstance = (app: Express): UserController => {
        if(UserController.userController === null) {
            UserController.userController = new UserController();

            app.get("/api/users", UserController.userController.findAllUsers);
            app.post("/api/users", UserController.userController.createUser);
            app.get("/api/users/:uid", UserController.userController.findUserById);
            app.put("/api/users/:uid", UserController.userController.updateUser);
            app.delete("/api/users/:uid", UserController.userController.deleteUser);
            app.get("/api/users/username/:username", UserController.userController.findUserByUsername);

        }

        return UserController.userController;
    }

    private constructor() {}

    /**
     * Retrieves the user by their primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid).then((user: User) => res.json(user));

    /**
     * Creates a new user instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body).then((user: User) => res.json(user));

    /**
     * Modifies an existing user instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body).then(status => res.send(status));

    /**
     * Removes a user instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid).then(status => res.send(status));

    /**
     * Removes a user instance from the database by username
     * @param {Request} req Represents request from client, including path
     * parameter username identifying the username of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    findUserByUsername = (req: Request, res: Response) => {
        UserController.userDao.findUserByUsername(req.params.username).then((user: User) => res.json(user));
    }

    findAllUsers = (req: Request, res: Response) => {
        UserController.userDao.findAllUsers().then((users: User[]) => res.json(users));
    }
}