/**
 * @file Implements model to represent administrators.
 */
import mongoose from "mongoose";

export default interface Admin {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    name: string,
    email: string,
    yearsAtMBTA: number,
}
