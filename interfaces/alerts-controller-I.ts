import {Request, Response} from "express";
/**
 * @file Declares API for alerts resource
 */

export default interface AlertsControllerI {
    findAlertById(req: Request, res: Response): void;
    findAllAlerts(req: Request, res: Response): void;
}