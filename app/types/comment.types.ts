export interface PostCommentDTO{
    id?: String,
    comment?: string,
    userId?: String,
    postId?: String
    name?: String,
    createdAt?: String,
    updatedAt?: String
}

export interface PostCommentList{
    content: PostCommentDTO[]
}