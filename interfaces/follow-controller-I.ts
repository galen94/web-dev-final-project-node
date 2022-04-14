import {Request, Response} from "express";

export default interface FollowController {
    followUser(req: Request, res: Response): void;
    unfollowUser(req: Request, res: Response): void;
    findAllUserFollowers(req: Request, res: Response): void;
    findAllUsersThatUserIsFollowing(req: Request, res: Response): void;
    findAllFollowsBetweenUsers(req: Request, res: Response): void;
    findFollowById(req: Request, res: Response): void;
}