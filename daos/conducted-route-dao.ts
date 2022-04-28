/**
 * @file Implements DAO managing data storage of route. Uses mongoose ConductedRouteModel
 * to integrate with MongoDB
 */
import ConductedRouteModel from "../mongoose/conducted-route-model";
import ConductedRoute from "../models/conducted-route";
import ConductedRouteDaoI from "../interfaces/conducted-route-dao-I";

/**
 * @class RouteDao Implements Data Access Object managing data storage
 * of Routes
 * @property {RouteDao} routeDao Private single instance of routeDao
 */
export default class ConductedRouteDao implements ConductedRouteDaoI {
    private static conductedRouteDao: ConductedRouteDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns RouteDao
     */
    public static getInstance = (): ConductedRouteDao => {
        if(ConductedRouteDao.conductedRouteDao === null) {
            ConductedRouteDao.conductedRouteDao = new ConductedRouteDao();
        }
        return ConductedRouteDao.conductedRouteDao;
    }

    private constructor() {}

    /**
     * Uses ConductedRouteModel to retrieve single route document by id
     * @param {string} rid Route's primary key
     * @returns Promise To be notified when route is retrieved from the database
     */
    findRouteById = async (rid: string): Promise<any> => {
        return ConductedRouteModel.findById(rid);
    }

    /**
     * Uses ConductedRouteModel to retrieve single route document from routes collection
     * by the associated User
     * @param {string} uid User's id
     * @returns Promise To be notified when route is retrieved from the database
     */
    findRouteByUserId = async (uid: string): Promise<any> =>
        ConductedRouteModel.findOne({user: uid});

    /**
     * Inserts route instance into the database
     * @param {Route} route Instance to be inserted into the database
     * @returns Promise To be notified when route is inserted into the database
     */
    createRoute = async (route: ConductedRoute): Promise<ConductedRoute> =>
        ConductedRouteModel.create(route);

    /**
     * Updates route with new values in database
     * @param {string} uid Primary key of user who's conducted route is to be modified
     * @param {ConductedRoute} route Route object containing properties and their new values
     * @returns Promise To be notified when route is updated in the database
     */
    updateRoute = async (uid: string, route: ConductedRoute): Promise<any> => {
        return ConductedRouteModel.updateOne({user: uid}, {$set: route});
    }

    /**
     * Removes route from the database.
     * @param {string} rid Primary key of route to be removed
     * @returns Promise To be notified when route is removed from the database
     */
    deleteRoute = async (rid: string): Promise<any> => {
        return ConductedRouteModel.deleteOne({_id: rid});
    }
}