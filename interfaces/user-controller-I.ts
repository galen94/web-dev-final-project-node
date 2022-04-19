import {Request, Response} from "express";

/**
 * @file Declares API for users resource
 */
export default interface UserControllerI {
    findUserByUsername (req: Request, res: Response): void;
    findUserById (req: Request, res: Response): void;
    createUser (req: Request, res: Response): void;
    updateUser (req: Request, res: Response): void;
    deleteUser (req: Request, res: Response): void;
};
