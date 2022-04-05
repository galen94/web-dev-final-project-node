/**
 * @file Declares API for Conductors related data access object methods
 */

import Conductor from "../models/conductor";

export default interface ConductorDaoI {
    createConductor(conductor: Conductor): Promise<Conductor>;
    updateConductor(coid: string, conductor: Conductor): Promise<any>;
    deleteConductor(coid: string): Promise<any>;
    findConductorById(coid: string): Promise<Conductor>;
    findAllConductors(): Promise<Conductor[]>;
    deleteConductorsByUsername(username: string): Promise<any>;

    // TODO +Galen pls tell me if these are horribly wrong lol.
    // updateCurrentRoute(route: string): Promise<any>;
    // deleteCurrentRoute(route: string): Promise<any>;
    // findConductorsCurrentRoute(coid: string): Promise<any>;
    // updateFavoriteRoute(route: string): Promise<any>;
    // deleteFavoriteRoute(route: string): Promise<any>;
    // findConductorsFavoriteRoute(coid: string): Promise<any>;
}