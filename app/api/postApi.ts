import { fetchAPI } from "../lib/api";
import { PostListResponse } from "../types/post.types";

export const getPosts = async(id: String): Promise<PostListResponse> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/post/${id}`);
};
