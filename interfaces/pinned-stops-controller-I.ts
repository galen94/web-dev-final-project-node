import {Request, Response} from "express";

export default interface PinnedStopControllerI {
    findAllPinnedStopsByUser (req: Request, res: Response): void;
    findOnePinnedStopsByUser (req: Request, res: Response): void;
    pinStop (req: Request, res: Response): void;
    unpinStop (req: Request, res: Response): void;
    findAllUsersWhoPinnedStop (req: Request, res: Response): void;
};
