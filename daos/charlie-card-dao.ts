/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */

import CharlieCardDaoI from "../interfaces/charlie-card-dao-I";
import CharlieCardModel from "../mongoose/charlie-card-model";
import CharlieCard from "../models/charlie-card";

/**
 * @class CommuterDao Implements Data Access Object managing data storage
 * of commuters
 * @property {CommuterDao} commuterDao Private single instance of CommuterDao
 */
export default class CharlieCardDao implements CharlieCardDaoI {
    private static charlieCardDao: CharlieCardDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): CharlieCardDao => {
        if (CharlieCardDao.charlieCardDao === null) {
            CharlieCardDao.charlieCardDao = new CharlieCardDao();
        }
        return CharlieCardDao.charlieCardDao;
    }

    private constructor() {
    }

    /**
     * Uses MessageModel to retrieve all message documents
     * @returns Promise To be notified when the messages are retrieved from database
     */
    userTakesARide = async (cardId: string, card: CharlieCard): Promise<any> =>
        CharlieCardModel.updateOne(
            {_id: cardId},
            {$set: {"currentAmount": (card.currentAmount-3)}});

    /**
     * Inserts message instance into the database
     * @param {string} uidSender sender's primary key
     * @param {string} uidRecipient recipient's primary key
     * @param {Message} message Instance to be inserted into the database
     * @returns Promise To be notified when message is inserted into the database
     */
    createCard = async (card: CharlieCard): Promise<CharlieCard> =>
        CharlieCardModel.create(card);

    /**
     * Uses MessageModel to retrieve all a single message document with the given mid
     * from message collection
     * @param {string} mid message's primary key
     * @returns Promise To be notified when the message is retrieved from database
     */
    findCardById = async (cardId: string): Promise<any> =>
        CharlieCardModel.findOne({_id: cardId})
            .populate("cardUser")
            .exec();

    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteCard = async (cardId: string): Promise<any> =>
        CharlieCardModel.deleteOne({_id: cardId});

    /**
     * Updates card with new values in database
     * @param {string} mid Primary key of message to be modified
     * @param {Message} message Card object containing properties and their new values
     * @returns Promise To be notified when message is updated in the database
     */
    updateCard = async (cardId: string, card: CharlieCard): Promise<any> =>
        CharlieCardModel.updateOne(
            {_id: cardId},
            {$set: card});
}