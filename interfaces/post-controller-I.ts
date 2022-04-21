import {Request, Response} from "express";
/**
 * @file Declares API for Users related data access object methods
 */
export default interface PostControllerI {
    userPostsAPost (req: Request, res: Response): void;
    userUpdatesAPost (req: Request, res: Response): void;
    updateStats(req: Request, res: Response): void;
    userDeletesAPost (req: Request, res: Response): void;
    findPostById (req: Request, res: Response): void;

}
