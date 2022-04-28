import ConductorLike from "../models/conductor-like";
import ConductorLikeModel from "../mongoose/conductor-like-model";
import PinnedStopModel from "../mongoose/pinned-stop-model";

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
    likeConductor = async (conid: string, comid: string): Promise<ConductorLike> => {
        const like = ConductorLikeModel.create({conductor: conid, likedBy: comid});
        console.log(like)
        return like;

    }

    /**
     * Deletes conductor like by commuter
     * @param conid conductor id
     * @param comid commuter id
     */
    unlikeConductor = async (cid: string): Promise<any> =>
        ConductorLikeModel.deleteOne({_id: cid});

    /**
     * Lists all conductor likes by certain commuter
     * @param comid commuter id
     */
    findAllConductorsLikedByCommuter = async (comid: string): Promise<ConductorLike[]> =>{
        const likes = ConductorLikeModel.find({likedBy: comid}).populate("conductor").populate("likedBy").exec();
        console.log(likes)
        return likes;

    }

    /**
     * Lists all commuters that liked conductor
     * @param conid conductor id
     */
    findAllCommutersThatLikedConductor = async (conid: string): Promise<ConductorLike[]> =>
        ConductorLikeModel.find({conductor: conid}).populate("likedBy").populate("conductor").exec();


    /**
     * Find if commuter already liked that conductor
     * @param conid
     * @param commuterId
     */
    likeExistsAlready = async (conid: string, commuterId: string): Promise<number> => {
        const like = await ConductorLikeModel.findOne({conductor: conid, likedBy: commuterId}).count();
        console.log(like, "in like dao")
        return like;
    }

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