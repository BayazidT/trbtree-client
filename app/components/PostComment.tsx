import { useState, useEffect } from 'react';
import { PostCommentDTO, PostCommentList } from '../types/comment.types';
import { getPostComments, deletePostComment } from '../api/postCommentApi';


export default function PostComment({ content }: { content: String }) {
  const [expanded, setExpanded] = useState(false);
  const [commentContent, setCommentContent] = useState<PostCommentDTO>({
    id: "",
    comment: "",
    userId: ""
  });
  const [comments, setComments] = useState<PostCommentList>();
  const isLong = true;

  useEffect(() =>{
    getComments(content);
  }, [content]);

  const getComments = async(postId: String) =>{
    const response = await getPostComments(postId);
    setComments(response);
  }
  const handleComment = async(commentId: any) =>{
    
    // commentContent.userId='60c8523c-23c7-4b7b-8a54-a9a2e69da5c4';
    // commentContent.postId = content;
    // await createPostComment(commentContent);
    // setCommentContent({
    //   comment: '',
    // });
        getComments(content);
  }
  const deleteComment = async(commentId: any) =>{
    await deletePostComment(commentId);
    console.log(`Comment deleted with id : ${commentId}`);
    getComments(content);
  }
  return (
    <div className="mb-4">
      <p
        className={`text-gray-800 dark:text-gray-200 leading-relaxed transition-all duration-300 ${
          !expanded && isLong ? 'line-clamp-1' : ''
        }`}
      >
        {comments?.content.map((com)=>(
            <p><span>{com.name}: </span>{com.comment}
            <button className='mt-1 text-teal-600 dark:text-teal-400 text-sm font-medium hover:underline focus:outline-none' 
            onClick={() =>deleteComment(com?.id)}> Delete</button></p>
        ))}
      </p>
       
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-teal-600 dark:text-teal-400 text-sm font-medium hover:underline focus:outline-none"
        >
          {expanded ? 'Hide' : 'Comments'}
        </button>
      )}
      <div className="flex-1">
      <form 
                onSubmit={handleComment} 
                className="max-w-3xl mx-auto  p-3 rounded-lg shadow-md"
                >
            <textarea
                value={commentContent.comment}
                onChange={(e) => setCommentContent({ ...commentContent, comment: e.target.value })}
                placeholder="Write a comment."
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 ]"
                
            />
            <div className="flex justify-end mt-4">
                <button
                type='submit'
                className="px-4 py-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg disabled:shadow-none"
                >
                Submit
                </button>
            </div>
            </form>
        </div>
    </div>
    
  );
}