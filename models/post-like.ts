/**
 * @file Declares PostLike data type representing relationship between
 * users and posts, as in user likes a post
 */
import Post from "./post";
import User from "../models/User";

/**
 * @typedef PostLike Represents likes relationship between a user and a post,
 * as in a user likes a post
 * @property {Post} post post being liked
 * @property {Commuter} likedBy User liking the post
 */
export default interface PostLike {
    post: Post,
    likedBy: User
};