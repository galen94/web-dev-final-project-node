// @ts-ignore
import {Request, Response} from "express";
/**
 * @file Declares API for admins resource
 */

export default interface AdminControllerI {
    createAdmin(req: Request, res: Response): void;
    updateAdmin(req: Request, res: Response): void;
    deleteAdmin(req: Request, res: Response): void;
    findAdminById(req: Request, res: Response): void;
    findAllAdmins(req: Request, res: Response): void;
    deleteAdminsByUsername(req: Request, res: Response): void;
}