/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */

import CommuterDaoI from "../interfaces/commuter-dao-I";
import CommuterModel from "../mongoose/commuter-model";
import Commuter from "../models/commuter";

/**
 * @class CommuterDao Implements Data Access Object managing data storage
 * of commuters
 * @property {CommuterDao} commuterDao Private single instance of CommuterDao
 */
export default class CommuterDao implements CommuterDaoI {
    private static commuterDao: CommuterDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): CommuterDao => {
        if (CommuterDao.commuterDao === null) {
            CommuterDao.commuterDao = new CommuterDao();
        }
        return CommuterDao.commuterDao;
    }

    private constructor() {
    }

    /**
     * Uses MessageModel to retrieve all message documents
     * @returns Promise To be notified when the messages are retrieved from database
     */
    findAllCommuters = async (): Promise<Commuter[]> =>
        CommuterModel.find()
            .populate("charlieCard")
            .exec();

    /**
     * Inserts message instance into the database
     * @param {string} uidSender sender's primary key
     * @param {string} uidRecipient recipient's primary key
     * @param {Message} message Instance to be inserted into the database
     * @returns Promise To be notified when message is inserted into the database
     */
    createCommuter = async (commuter: Commuter): Promise<Commuter> =>
        CommuterModel.create({commuter: commuter});

    /**
     * Uses MessageModel to retrieve all a single message document with the given mid
     * from message collection
     * @param {string} mid message's primary key
     * @returns Promise To be notified when the message is retrieved from database
     */
    findCommuterById = async (cid: string): Promise<any> =>
        CommuterModel.findOne({_id: cid})
            .populate("charlieCard")
            .exec();

    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteCommuter = async (cid: string): Promise<any> =>
        CommuterModel.deleteOne({_id: cid});

    /**
     * Updates message with new values in database
     * @param {string} mid Primary key of message to be modified
     * @param {Message} message Message object containing properties and their new values
     * @returns Promise To be notified when message is updated in the database
     */
    updateCommuter = async (cid: string, commuter: Commuter): Promise<any> =>
        CommuterModel.updateOne(
            {_id: cid},
            {$set: commuter});

}