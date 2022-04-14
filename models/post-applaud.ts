import Post from "./post";
import Commuter from "./commuter";

export default interface PostApplaud {
    post: Post,
    applaudedBy: Commuter
}