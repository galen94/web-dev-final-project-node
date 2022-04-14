import ConductorLike from "../models/conductor-like";
import ConductorLikeModel from "../mongoose/conductor-like-model";

export default class ConductorLikeDao {
    private static conductorLikeDao: ConductorLikeDao | null = null;

    public static getInstance = (): ConductorLikeDao => {
        if (ConductorLikeDao.conductorLikeDao === null) {
            ConductorLikeDao.conductorLikeDao = new ConductorLikeDao();
        }
        return ConductorLikeDao.conductorLikeDao;
    }

    private constructor() {
    }

    /**
     * Creates conductor like by commuter
     * @param conid conductor id
     * @param comid commuter id
     */
    likeConductor = async (conid: string, comid: string): Promise<ConductorLike> =>
        ConductorLikeModel.create({conductor: conid, likedBy: comid});

    /**
     * Deletes conductor like by commuter
     * @param conid conductor id
     * @param comid commuter id
     */
    unlikeConductor = async (conid: string, comid: string): Promise<any> =>
        ConductorLikeModel.deleteOne({conductor: conid, likedBy: comid});

    /**
     * Lists all conductor likes by certain commuter
     * @param comid commuter id
     */
    findAllConductorsLikedByCommuter = async (comid: string): Promise<ConductorLike[]> =>
        ConductorLikeModel.find({likedBy: comid}).populate("conductor").exec();

    /**
     * Lists all commuters that liked conductor
     * @param conid conductor id
     */
    findAllCommutersThatLikedConductor = async (conid: string): Promise<ConductorLike[]> =>
        ConductorLikeModel.find({conductor: conid}).populate("likedBy").exec();

    /**
     * Calcualtes conductor likes count
     * @param conid conductor id
     */
    countConductorLikes = async (conid: string): Promise<any> =>
        ConductorLikeModel.count({conductor: conid});

    /**
     * Gets commuter that likes conductor
     * @param comid commuter id
     * @param conid conductor id
     */
    findCommuterLikesConductor = async (comid: string, conid: string): Promise<any> =>
        ConductorLikeModel.findOne({conductor: conid, likedBy: comid});

}