import User from "../models/user";

/**
 * @file Declares API for Users related data access object methods
 */
export default interface UserDaoI {
    findUserByUsername (username: string): Promise<any>;
    findUserById (uid: string): Promise<any>;
    createUser (user: User): Promise<User>;
    updateUser (uid: string, user: User): Promise<any>;
    deleteUser (uid: string): Promise<any>;
}