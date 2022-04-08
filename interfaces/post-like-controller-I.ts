import {Request, Response} from "express";

export default interface PostLikeControllerI {
    findAllUsersThatLikedPost (req: Request, res: Response): void;
    findAllPostsLikedByUser (req: Request, res: Response): void;
    userTogglesPostLikes (req: Request, res: Response): void;
};