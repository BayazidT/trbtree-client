// Add this component above your FeedPage export
import { useState, useEffect } from 'react';
import { PostCommentDTO, PostCommentList } from '../types/comment.types';
import { getPostComments } from '../api/postCommentApi';


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


  }, []);

  const getComments = async(postId: String) =>{
    const response = await getPostComments(postId);
    setComments(response);
    console.log(response);
  }
  const handlePost = async(content: any) =>{
    console.log(content);
  }
  return (
    <div className="mb-4">
      <p
        className={`text-gray-800 dark:text-gray-200 leading-relaxed transition-all duration-300 ${
          !expanded && isLong ? 'line-clamp-1' : ''
        }`}
      >
        {comments?.content.map((com)=>(
            <p><span>{com.name}: </span>{com.comment}</p>
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
            <input
                value={''}
                onChange={(e) => setCommentContent({ ...commentContent, comment: e.target.value })}
                placeholder="Write a comment."
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 min-h-[90px]"
                
            />
            <div className="flex justify-end mt-4">
                <button
                onClick={() => handlePost( { ...commentContent, content: commentContent.comment })}
                className="px-4 py-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg disabled:shadow-none"
                >
                Submit
                </button>
            </div>
        </div>
    </div>
    
  );
}