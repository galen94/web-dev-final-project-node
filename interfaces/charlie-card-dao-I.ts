import Commuter from "../models/commuter";
import CharlieCard from "../models/charlie-card";


/**
 * @file Declares API for Users related data access object methods
 */
export default interface CharlieCardDaoI {
    userTakesARide (cardId: string, card: CharlieCard):Promise<any>;
    createCard(card: CharlieCard): Promise<CharlieCard>;
    updateCard(cardId: string, card: CharlieCard): Promise<any>;
    deleteCard(cardId: string): Promise<any>;
    findCardById(cardId: string): Promise<any>;
}