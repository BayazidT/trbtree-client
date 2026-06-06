export interface PostResponse{
    id: String,
    name?: String,
    content?: string,
    visibility?: String,
    likeCount?: number,
    commentCount?: number,
    createdAt?: String,
    updatedAt?: String
}

export interface PostListResponse{
    content: PostResponse[],
    totalElements?: number,
    totalPages?: number,
    pageSize?: number,
    first?: boolean,
    last?: boolean

}
// "totalElements": 0,
//   "totalPages": 0,
//   "pageNumber": 0,
//   "pageSize": 0,
//   "first": false,
//   "last": false
//  private UUID id;

//     private UUID userId;
//     private String username;

//     private String content;

//     private String visibility;

//     private Integer likeCount;
//     private Integer commentCount;

//     private Instant createdAt;
//     private Instant updatedAt;