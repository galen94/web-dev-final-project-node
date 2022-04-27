/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import ConductorLikeDao from "../daos/conductor-like-dao";
import UserDao from "../daos/user-dao"
import ConductorLike from "../models/conductor-like";

/**
 * @class ConductorLikeController Implements RESTful Web service API for likes resource.
 */
export default class ConductorLikeController {
    private static conductorLikeDao: ConductorLikeDao = ConductorLikeDao.getInstance();
    private static UserDao: UserDao = UserDao.getInstance();
    private static conductorLikeController: ConductorLikeController | null = null;
    /**
     * Creates singleton controller like instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return ConductorController
     */

    public static getInstance = (app: Express): ConductorLikeController => {
        if(ConductorLikeController.conductorLikeController === null) {
            ConductorLikeController.conductorLikeController = new ConductorLikeController();
            app.get("/api/commuters/:comid/conductorlikes/:conid", ConductorLikeController.conductorLikeController.likeExistsAlready)
            app.get("/api/commuters/:comid/conductorlikes", ConductorLikeController.conductorLikeController.findAllConductorsLikedByCommuter);
            app.get("/api/conductors/:conid/conductorlikes", ConductorLikeController.conductorLikeController.findAllCommutersThatLikedConductor);
            app.post("/api/commuters/:comid/conductorlikes/:conid", ConductorLikeController.conductorLikeController.commuterLikesConductor);
            app.delete("/api/conductorlikes/:cid", ConductorLikeController.conductorLikeController.commuterUnlikesConductor);
        }
        return ConductorLikeController.conductorLikeController;
    }

    private constructor() {}

    likeExistsAlready = (req: Request, res: Response) => {
        // @ts-ignore
        const commuterId = req.params.comid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.comid;
        console.log(commuterId)

        if(commuterId === "me"){
            res.sendStatus(503);
            return;
        }
        ConductorLikeController.conductorLikeDao.likeExistsAlready(req.params.conid, commuterId)
            .then(count => res.json(count));
    }


    /**
     * Retrieves all commuters that liked a conductor
     * @param {Request} req request from client, including the path
     * parameter conid representing the conductor
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the commuters
     */
    findAllCommutersThatLikedConductor = (req: Request, res: Response) => {
        // @ts-ignore
        const conductorId = req.params.conid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.conid;
        if(conductorId === "me"){
            res.sendStatus(503);
            return;
        }
        ConductorLikeController.conductorLikeDao.findAllCommutersThatLikedConductor(conductorId)
            .then((conductorLikes: ConductorLike[]) => res.json(conductorLikes));
    }

    /**
     * Retrieves all conductors liked by a commuter from the database
     * @param {Request} req request from client, including the path
     * parameter comid representing the commuter liked the conductor
     * @param {Response} res response to client, including the
     * body formatted as JSON arrays containing the conductors that were liked
     */
    findAllConductorsLikedByCommuter = (req: Request, res: Response) => {
        // @ts-ignore
        const commuterId = req.params.comid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.comid;
        if(commuterId === "me"){
            res.sendStatus(503);
            return;
        }
        ConductorLikeController.conductorLikeDao.findAllConductorsLikedByCommuter(commuterId)
            .then((conductorLikes: ConductorLike[]) => res.json(conductorLikes));
    }
    /**
     *
     * @param {Request} req Represents request from client, including the
     * path parameters conid and comid representing the commuter that is liking the conductor
     * and the conductor being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new conductor likes that were inserted in the
     * database
     */
    commuterLikesConductor = (req: Request, res: Response) =>{
        // @ts-ignore
        const commuterId = req.params.comid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.comid;
        if(commuterId === "me"){
            res.sendStatus(503);
            return;
        }
        ConductorLikeController.conductorLikeDao.likeConductor(req.params.conid, commuterId).then((conductorLike: ConductorLike) => res.json(conductorLike));


    }

    commuterUnlikesConductor = (req: Request, res: Response) =>
        ConductorLikeController.conductorLikeDao.unlikeConductor(req.params.cid).then(status => res.send(status));




    // commuterLikesConductor = async (req: Request, res: Response) => {
    //     // @ts-ignore
    //     const userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
    //     if(userId === "me"){
    //         res.sendStatus(503);
    //         return;
    //     }
    //     const conid = req.params.conid;
    //     const comid = req.params.comid;
    //     const conductorLikeDao = ConductorLikeController.conductorLikeDao;
    //     const UserDao = ConductorLikeController.UserDao;
    //     // @ts-ignore
    //     const profile = req.session['profile'];
    //     const comId = comid && profile ?
    //         profile._id : comid;
    //
    //     try {
    //         const commuterAlreadyLikedConductor = await conductorLikeDao.findCommuterLikesConductor(comId, conid);
    //         const conductorLikesCount = await conductorLikeDao.countConductorLikes(conid);
    //
    //         let conductor = await UserDao.findUserById(conid);
    //         if (commuterAlreadyLikedConductor) {
    //             await conductorLikeDao.unlikeConductor(comid, conid);
    //             conductor.stats.likes = conductorLikesCount - 1;
    //         } else {
    //             await conductorLikeDao.likeConductor(comid, conid);
    //             conductor.stats.likes = conductorLikesCount + 1;
    //         }
    //         res.sendStatus(200);
    //     } catch (e) {
    //         res.sendStatus(404);
    //     }
    //
    // }

};