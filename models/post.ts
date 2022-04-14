/**
 * @file Declares Like data type representing relationship between
 * users and posts, as in user likes a post
 */
import mongoose from "mongoose";
import UserRole from "./role";

/**
 * @typedef PostLike Represents likes relationship between a user and a post,
 * as in a user likes a post
 * @property {Post} post post being liked
 * @property {Commuter} likedBy User liking the post
 * @property {Commuter} applaudedBy User applauding the post
 */
export default interface Post {
    _id?: mongoose.Schema.Types.ObjectId,
    post: string,
    likes: number,
    applauds: number,
    name: string,
    username: string,
    userRole: UserRole,
    timePosted: string,
};