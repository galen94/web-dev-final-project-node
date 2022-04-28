import ConductedRoute from "../models/conducted-route";

/**
 * @file Declares API for Routes related data access object methods
 */
export default interface ConductedRouteDaoI {
    findRouteById (rid: string): Promise<any>;
    findRouteByUserId (uid: string): Promise<any>;
    createRoute (user: ConductedRoute): Promise<ConductedRoute>;
    updateRoute (uid: string, route: ConductedRoute): Promise<any>;
    deleteRoute (rid: string): Promise<any>;
}