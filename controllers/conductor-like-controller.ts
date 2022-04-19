/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import ConductorLikeDao from "../daos/conductor-like-dao";
import ConductorDao from "../daos/conductor-dao";

/**
 * @class ConductorLikeController Implements RESTful Web service API for likes resource.
 */
export default class ConductorLikeController {
    private static conductorLikeDao: ConductorLikeDao = ConductorLikeDao.getInstance();
    private static conductorDao: ConductorDao = ConductorDao.getInstance();
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
            app.get("/api/commuters/:comid/likesconductor", ConductorLikeController.conductorLikeController.findAllConductorsLikedByCommuter);
            app.get("/api/conductors/:conid/likesconductor", ConductorLikeController.conductorLikeController.findAllCommutersThatLikedConductor);
            app.put("/api/commuters/:comid/likesconductor/:conid", ConductorLikeController.conductorLikeController.commuterLikesConductor);
        }
        return ConductorLikeController.conductorLikeController;
    }

    private constructor() {}

    /**
     * Retrieves all commuters that liked a conductor
     * @param {Request} req request from client, including the path
     * parameter conid representing the conductor
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the commuters
     */
    findAllCommutersThatLikedConductor = (req: Request, res: Response) =>
        ConductorLikeController.conductorLikeDao.findAllCommutersThatLikedConductor(req.params.conid)
            .then(conductorLikes => res.json(conductorLikes));

    /**
     * Retrieves all conductors liked by a commuter from the database
     * @param {Request} req request from client, including the path
     * parameter comid representing the commuter liked the conductor
     * @param {Response} res response to client, including the
     * body formatted as JSON arrays containing the conductors that were liked
     */
    findAllConductorsLikedByCommuter = (req: Request, res: Response) => {
        const comid = req.params.comid;
        // @ts-ignore
        const profile = req.session['profile'];
        const comId = comid && profile ?
            profile._id : comid;

        ConductorLikeController.conductorLikeDao.findAllConductorsLikedByCommuter(comId)
            .then(conductorLikes => {
                const nonNullConductors = conductorLikes.filter(conductorLike => conductorLike.conductor);
                const conductorsFromLikes = nonNullConductors.map(conductorLike => conductorLike.conductor);
                res.json(conductorsFromLikes);
            });
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

    commuterLikesConductor = async (req: Request, res: Response) => {
        const conid = req.params.conid;
        const comid = req.params.comid;
        const conductorLikeDao = ConductorLikeController.conductorLikeDao;
        const conductorDao = ConductorLikeController.conductorDao;
        // @ts-ignore
        const profile = req.session['profile'];
        const comId = comid && profile ?
            profile._id : comid;

        try {
            const commuterAlreadyLikedConductor = await conductorLikeDao.findCommuterLikesConductor(comId, conid);
            const conductorLikesCount = await conductorLikeDao.countConductorLikes(conid);

            let conductor = await conductorDao.findConductorById(conid);
            if (commuterAlreadyLikedConductor) {
                await conductorLikeDao.unlikeConductor(comid, conid);
                conductor.stats.likes = conductorLikesCount - 1;
            } else {
                await conductorLikeDao.likeConductor(comid, conid);
                conductor.stats.likes = conductorLikesCount + 1;
            }
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }

    }

};