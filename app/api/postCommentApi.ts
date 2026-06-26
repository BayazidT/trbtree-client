import { fetchAPI } from "../lib/api";
import { PostCommentDTO, PostCommentList } from "../types/comment.types";

export const createPostComment = async(comment: PostCommentDTO) => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/post/comment/`, {
    method: "POST",
    body: comment
  });
}

export const getPostComments = async(postId: String): Promise<PostCommentList> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/post/comment/post/${postId}`);
}