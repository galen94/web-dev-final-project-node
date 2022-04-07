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
};