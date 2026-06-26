export interface PostCommentDTO{
    id?: String,
    comment?: String,
    userId?: String,
    name?: String,
    createdAt?: String,
    updatedAt?: String
}

export interface PostCommentList{
    content: PostCommentDTO[]
}