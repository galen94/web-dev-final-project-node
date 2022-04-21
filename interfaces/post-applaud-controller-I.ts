import {Request, Response} from "express";

export default interface PostApplaudControllerI {
    findAllUsersThatApplaudedPost (req: Request, res: Response): void;
    findAllPostsApplaudedByUser (req: Request, res: Response): void;
    userTogglesPostApplauds (req: Request, res: Response): void;
}

