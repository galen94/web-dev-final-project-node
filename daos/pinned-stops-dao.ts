/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import PinnedStopModel from "../mongoose/pinned-stop-model";
import PinnedStop from "../models/pinned-stop";
import PinnedStopDaoI from "../interfaces/pinned-stops-dao-I";

/**
 * @class PinnedStopDao Implements Data Access Object managing data storage
 * of Users
 * @property {PinnedStopDao} pinnedStopDao Private single instance of PinnedStopDao
 */
export default class PinnedStopDao implements PinnedStopDaoI {
    private static pinnedStopDao: PinnedStopDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns PinnedStopDao
     */
    public static getInstance = (): PinnedStopDao => {
        if(PinnedStopDao.pinnedStopDao === null) {
            PinnedStopDao.pinnedStopDao = new PinnedStopDao();
        }
        return PinnedStopDao.pinnedStopDao;
    }

    private constructor() {}


    findOnePinnedStopsByUser = async (pid: string): Promise<any> => {
        return PinnedStopModel.find({_id: pid});
    }

    findAllUsersWhoPinnedStop = async (sid: string): Promise<PinnedStop[]> => {
        const pins = PinnedStopModel.find({stopId: sid}).populate("pinnedBy");
        return pins;
    }


    findAllPinnedStopsByUser = async (uid: string): Promise<PinnedStop[]> =>
        PinnedStopModel.find({pinnedBy: uid});


    unpinStop = async (pid: string): Promise<any> => {
        return PinnedStopModel.deleteOne({_id: pid});
    }


    pinStop = async (routeType: string, routeId: string, routeName: string, stopId: string, stopName: string, userId: string): Promise<PinnedStop> => {
        return PinnedStopModel.create({ routeType: routeType, routeId: routeId, routeName: routeName, stopId: stopId, stopName: stopName, pinnedBy: userId});
    }


    findAllPins = async (): Promise<PinnedStop[]> =>
        PinnedStopModel.find().populate("pinnedBy");

    pinExistsAlready = async (routeType: string, routeId: string, stopId: string, userId: string): Promise<number> => {
        const pin = await PinnedStopModel.findOne({routeType: routeType, routeId: routeId, stopId: stopId, pinnedBy: userId}).count();
        return pin;
    }
}
