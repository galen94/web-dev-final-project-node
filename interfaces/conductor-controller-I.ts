import {Request, Response} from "express";

/**
 * @file Declares API for conductors resource
 */

export default interface ConductorControllerI {
    createConductor(req: Request, res: Response): void;
    updateConductor(req: Request, res: Response): void;
    deleteConductor(req: Request, res: Response): void;
    findConductorById(req: Request, res: Response): void;
    findAllConductors(req: Request, res: Response): void;
    deleteConductorsByUsername(req: Request, res: Response): void;
    // updateCurrentRoute(req: Request, res: Response): void;
    // deleteCurrentRoute(req: Request, res: Response): void;
    // findConductorsCurrentRoute(req: Request, res: Response): void;
    // updateFavoriteRoute(req: Request, res: Response): void;
    // deleteFavoriteRoute(req: Request, res: Response): void;
    // findConductorsFavoriteRoute(req: Request, res: Response): void;
};