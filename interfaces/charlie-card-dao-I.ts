import Commuter from "../models/commuter";
import CharlieCard from "../models/charlie-card";


/**
 * @file Declares API for Users related data access object methods
 */
export default interface CharlieCardDaoI {
    userTakesARide ():Promise<any>;
    userSetsCardAmount(): Promise<any>;
    createCard(): Promise<CharlieCard>;
    updateCard(): Promise<any>;
    deleteCard(): Promise<any>;
    findCardById(): Promise<CharlieCard>;
    findCardUserById(): Promise<Commuter>;
}