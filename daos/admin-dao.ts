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

    private constructor() {}

    createAdmin = async (admin: Admin): Promise<Admin> =>
        AdminModel.create({admin: admin});

    deleteAdmin = async (aid: string): Promise<any> =>
        AdminModel.deleteOne({_id: aid});

    deleteAdminsByUsername = async (username: string): Promise<any> =>
        AdminModel.deleteOne({username: username});

    findAdminById= async (aid: string): Promise<any> =>
        AdminModel.findOne({_id: aid});

    findAllAdmins = async (): Promise<Admin[]> =>
        AdminModel.find();

    updateAdmin = async (aid: string, admin: Admin): Promise<any> =>
        AdminModel.updateOne(
            {_id: aid},
            {$set: admin});
}