import {Request, Response} from "express";

/**
 * @file Declares API for users resource
 */
export default interface CommuterControllerI {
    createCommuter(req: Request, res: Response): void;
    updateCommuter(req: Request, res: Response): void;
    deleteCommuter(req: Request, res: Response): void;
    findCommuterById(req: Request, res: Response): void;
    findAllCommuters (req: Request, res: Response): void;
    deleteCommutersByUsername(req: Request, res: Response): void;
};