import Admin from "../models/admin";
/**
 * @file Declares API for Admins related data access object methods
 */

export default interface AdminDaoI {
    createAdmin(admin: Admin): Promise<Admin>;
    updateAdmin(aid: string, admin: Admin): Promise<any>;
    deleteAdmin(aid: string): Promise<any>;
    findAdminById(aid: string): Promise<Admin>;
    findAllAdmins(): Promise<Admin[]>;
    deleteAdminsByUsername(username: string): Promise<any>;
}