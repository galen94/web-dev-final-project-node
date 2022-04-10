/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import ConductorDaoI from "../interfaces/conductor-dao-I";
import ConductorModel from "../mongoose/conductor-model";
import Conductor from "../models/admin";
import conductor from "../models/conductor";

/**
 * @class ConductorDao Implements Data Access Object managing data storage
 * of administrators
 * @property {ConductorDao} conductorDao Private single instance of CommuterDao
 */
export default class ConductorDao implements ConductorDaoI {
    private static conductorDao: ConductorDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): ConductorDao => {
        if (ConductorDao.conductorDao === null) {
            ConductorDao.conductorDao = new ConductorDao();
        }
        return ConductorDao.conductorDao;
    }

    private constructor() {
    }

    /**
     * Inserts message instance into the database
     * @param {string} uidSender sender's primary key
     * @param {string} uidRecipient recipient's primary key
     * @param {Message} message instance to be inserted into the database.
     * @returns Promise to be notified when message is inserted into the database
     */
    createConductor = async (conductor: conductor): Promise<conductor> =>
        ConductorModel.create({conductor: conductor});

    /**
     * Updates message with new values in database
     * @param {string} coid Primary key of message to be modified
     * @param {Message} message Message object containing properties and their new values
     * @returns Promise To be notified when message is updated in the database
     */
    updateConductor = async (coid: string, conductor: conductor): Promise<any> =>
        ConductorModel.updateOne(
            {_id: coid},
            {$set: conductor});

    /**
     * Removes message from the database.
     * @param {string} coid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteConductor = async (coid: string): Promise<any> =>
        ConductorModel.deleteOne({_id: coid});

    deleteConductorsByUsername = async (username: string): Promise<any> =>
        ConductorModel.deleteOne({username: username});

    /**
     * Uses MessageModel to retrieve all a single message document with the given aid
     * from message collection
     * @param {string} coid message's primary key
     * @returns Promise To be notified when the message is retrieved from database
     */
    findConductorById = async (coid: string): Promise<any> =>
        ConductorModel.findOne({_id: coid})
            .populate("name")
            .exec();

    /**
     * Uses MessageModel to retrieve all message documents
     * @returns Promise To be notified when the messages are retrieved from database
     */
    findAllConductors = async(): Promise<conductor[]> =>
        //@ts-ignore
        ConductorModel.find()
            .populate("name")
            .exec();

    /**
     * Updates message with new values in database
     * @param {string} coid Primary key of message to be modified
     * @param {string} route Route to be updated.
     * @param {Message} message Message object containing properties and their new values
     * @returns Promise To be notified when message is updated in the database
     */
    // TODO +Galen this might be a bit nervy I'll ask you for help on this. Commenting out for now.
    // updateCurrentRoute = async (coid: string, route: string): Promise<any> =>
    //     ConductorModel.updateOne(
    //         {_id: coid},
    //         {currentRouteToConduct: route},
    //     );
    //
    //
    //
    //
    // deleteCurrentRoute(route: string): Promise<any> {
    //     throw new Error("Method not implemented.");
    // }
    // findConductorsCurrentRoute(coid: string): Promise<any> {
    //     throw new Error("Method not implemented.");
    // }
    // createFavoriteRoute(route: string): Promise<any> {
    //     throw new Error("Method not implemented.");
    // }
    // updateFavoriteRoute(route: string): Promise<any> {
    //     throw new Error("Method not implemented.");
    // }
    // deleteFavoriteRoute(route: string): Promise<any> {
    //     throw new Error("Method not implemented.");
    // }
    // findConductorsFavoriteRoute(coid: string): Promise<any> {
    //     throw new Error("Method not implemented.");
    // }
}