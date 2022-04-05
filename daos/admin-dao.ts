/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */

import AdminDaoI from "../interfaces/admin-dao-I";
import AdminModel from "../mongoose/admin-model";
import Admin from "../models/admin";

/**
 * @class AdminDao Implements Data Access Object managing data storage
 * of administrators
 * @property {AdminDao} adminDao Private single instance of CommuterDao
 */
export default class AdminDao implements AdminDaoI {
    private static adminDao: AdminDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): AdminDao => {
        if (AdminDao.adminDao === null) {
            AdminDao.adminDao = new AdminDao();
        }
        return AdminDao.adminDao;
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
    createAdmin = async (admin: Admin): Promise<Admin> =>
        AdminModel.create({admin: admin});

    /**
     * Removes message from the database.
     * @param {string} aid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteAdmin = async (aid: string): Promise<any> =>
        AdminModel.deleteOne({_id: aid});

    deleteAdminsByUsername = async (username: string): Promise<any> =>
        AdminModel.deleteOne({username: username});

    /**
     * Uses MessageModel to retrieve all a single message document with the given aid
     * from message collection
     * @param {string} aid message's primary key
     * @returns Promise To be notified when the message is retrieved from database
     */
    findAdminById= async (aid: string): Promise<any> =>
        AdminModel.findOne({_id: aid})
            .populate("name")
            .exec();

    // @ts-ignore
    /**
     * Uses MessageModel to retrieve all message documents
     * @returns Promise To be notified when the messages are retrieved from database
     */
        //TODO +Galen finding that there's an error with this.. i think because the promise (Admin[])?..
        // supressing for now but any suggestions appreciated!
    findAllAdmins = async (): Promise<Admin[]> =>
        //@ts-ignore
        AdminModel.find()
            .populate("name")
            .exec();

    /**
     * Updates message with new values in database
     * @param {string} aid Primary key of message to be modified
     * @param {Message} message Message object containing properties and their new values
     * @returns Promise To be notified when message is updated in the database
     */
    updateAdmin = async (aid: string, admin: Admin): Promise<any> =>
        AdminModel.updateOne(
            {_id: aid},
            {$set: admin});







}