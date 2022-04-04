import {Request, Response} from "express";

/**
 * @file Declares API for users resource
 */
export default interface CharlieCardControllerI {
    userTakesARide (req: Request, res: Response): void;
    createCard (req: Request, res: Response): void;
    updateCard (req: Request, res: Response): void;
    deleteCard (req: Request, res: Response): void;
    findCardById (req: Request, res: Response): void;
};
