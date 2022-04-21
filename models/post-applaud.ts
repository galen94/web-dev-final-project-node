import Post from "./post";
import User from "./user";

export default interface PostApplaud {
    post: Post,
    applaudedBy: User
}