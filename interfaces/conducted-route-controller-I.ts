import {Request, Response} from "express";

/**
 * @file Declares API for conducted routes resource
 */
export default interface conductedRouteControllerI {
    findRouteByUserId (req: Request, res: Response): void;
    conductRoute (req: Request, res: Response): void;
    deleteRoute (req: Request, res: Response): void;
};