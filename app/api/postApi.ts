import { fetchAPI } from "../lib/api";
import { PostListResponse, PostResponse } from "../types/post.types";

export const getPosts = async(id: String): Promise<PostListResponse> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/post/`);
};

export const createPost = async(post: PostResponse, id: string) => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/post/${id}`, {
    method: "POST",
    body: post
  });
}


export const updatePost = async(id: String, content: any) => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/post/${id}`, {
    method: "PUT",
    body: content
  });
}

export const updatePostLike = async(id: String, userId: String) =>{
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/post/${id}/${userId}`,
    {method: "PATCH"}
  );
}

export const deletePostById = async(id: String) => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/post/${id}`,
    {method: "DELETE"}
  );
};