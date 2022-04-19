/**
 * @file Implements model to represent users.
 */
import mongoose from "mongoose";
import CharlieCard from "./charlie-card";

export default interface Commuter {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    name: string,
    email?: string,
    dateOfBirth?: Date,
    homeStop?: string
    charlieCard: CharlieCard
};


//TODO: MAKE POLYMORPHIC USER TYPE INSTEAD OF 3 DIFFERENT SCHEMAS
// export default interface User {
//     _id?: mongoose.Schema.Types.ObjectId,
//     username: string,
//     password: string,
//     name: string,
//     email?: string,
//     dateOfBirth?: Date,
//     homeStop?: string
//     charlieCard?: CharlieCard,
//     yearsAtMBTA?: number,
//     currentRouteConducting?: string,
//     favoriteRouteToConduct?: string
// };
