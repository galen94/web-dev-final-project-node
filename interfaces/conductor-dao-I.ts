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
}