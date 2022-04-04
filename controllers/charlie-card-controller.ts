/**
 * @file Controller RESTful Web service API for users resource
 */
import {Express, Request, Response} from "express";
import CharlieCardDao from "../daos/charlie-card-dao";
import CharlieCardControllerI from "../interfaces/charlie-card-controller-I";
import CharlieCardModel from "../mongoose/charlie-card-model";
import CharlieCard from "../models/charlie-card";

/**
 * @class CommuterController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users to create a new user instance</li>
 *     <li>GET /api/users to retrieve all the user instances</li>
 *     <li>GET /api/users/:uid to retrieve an individual user instance </li>
 *     <li>PUT /api/users/:uid to modify an individual user instance </li>
 *     <li>DELETE /api/users/:uid to remove a particular user instance</li>
 *     <li>DELETE /api/users to remove all the user instances</li>
 * </ul>
 * @property {CommuterDao} commuterDao Singleton DAO implementing user CRUD operations
 * @property {CommuterController} commuterController Singleton controller implementing
 * RESTful Web service API
 */
export default class CharlieCardController implements CharlieCardControllerI {
    private static charlieCardDao: CharlieCardDao = CharlieCardDao.getInstance();
    private static charlieCardController: CharlieCardController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns CommuterController
     */
    public static getInstance = (app: Express): CharlieCardController => {
        if(CharlieCardController.charlieCardController === null) {
            CharlieCardController.charlieCardController = new CharlieCardController();

            app.post("/api/cards", CharlieCardController.charlieCardController.createCard);
            app.put("/api/card/:cid", CharlieCardController.charlieCardController.updateCard);
            app.delete("/api/card/:cid", CharlieCardController.charlieCardController.deleteCard);
            app.get("/api/card/:cid", CharlieCardController.charlieCardController.findCardById);
            app.put("/api/users/:uid/useCard/:cid", CharlieCardController.charlieCardController.userTakesARide);
        }

        return CharlieCardController.charlieCardController;
    }

    private constructor() {}


    /**
     * Retrieves the user by their primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
    findCardById = (req: Request, res: Response) =>
        CharlieCardController.charlieCardDao.findCardById(req.params.cardId).then((card: CharlieCard) => res.json(card));

    /**
     * Creates a new user instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
    createCard = (req: Request, res: Response) =>
        CharlieCardController.charlieCardDao.createCard(req.body).then((card: CharlieCard) => res.json(card));

    /**
     * Modifies an existing user instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    updateCard = (req: Request, res: Response) =>
        CharlieCardController.charlieCardDao.updateCard(req.params.cardId, req.body).then(status => res.json(status));

    /**
     * Removes a user instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteCard = (req: Request, res: Response) =>
        CharlieCardController.charlieCardDao.deleteCard(req.params.cardId).then(status => res.send(status));


    /**
     * Removes a user instance from the database by username
     * @param {Request} req Represents request from client, including path
     * parameter username identifying the username of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    userTakesARide = (req: Request, res: Response) => {
        CharlieCardController.charlieCardDao.userTakesARide(req.params.cardId, req.body).then(status => res.json(status));
    }
}
