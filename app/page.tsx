'use client';


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { myProfile } from '@/app/data/profile';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getUser, getUserTree } from './data/user';
import { User, UserList } from './types/auth.types';
import { Connection, ConnectionRequest, ConnectionResponseList, ConnectionStatus } from './types/connection.types';
import { Conversation, ConversationList } from './types/conversation.types';
import { getConnection,updateConnectionStatus, sendConnectionRequest, getConnectionRequestReceive, getConnectionRequestSend } from './api/connectionApi';
import { createConversation, getConversation, getIfConversationExist } from './api/conversationApi';
import { getPosts, createPost, updatePostLike } from './api/postApi';
import { PostListResponse, PostResponse } from './types/post.types';
import ExpandablePostContent from './components/ExpandablePostContent';
import { create } from 'domain';
import { get } from 'http';
import PostComment from './components/PostComment';
const cardHover = {
  rest: { y: 0, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
  hover: { y: -4, boxShadow: '0 15px 30px rgba(0,0,0,0.3)' },
};

// Mock data
const users = [
  { id: 1, name: 'John Doe', username: 'johndoe', profilePic: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Jane Smith', username: 'janesmith', profilePic: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'Alice Johnson', username: 'alicej', profilePic: '/placeholder.svg?height=40&width=40' },
  { id: 4, name: 'Bob Brown', username: 'bobbrown', profilePic: '/placeholder.svg?height=40&width=40' },
  { id: 5, name: 'Eve Davis', username: 'evedavis', profilePic: '/placeholder.svg?height=40&width=40' },
];

const events = [
  { id: 1, title: 'Tech Conference 2026', date: '2026-03-15', description: 'Annual tech gathering with keynote speakers on AI and ML.', location: 'San Francisco, CA' },
  { id: 2, title: 'Web Dev Workshop', date: '2026-04-02', description: 'Hands-on session on modern web frameworks.', location: 'Online' },
  { id: 3, title: 'Design Meetup', date: '2026-05-10', description: 'Networking event for designers and creatives.', location: 'New York, NY' },
];

const updates = [
  { id: 1, title: 'New Feature Release', date: '2026-02-16', description: 'Introduced dark mode toggle for better user experience.' },
  { id: 2, title: 'Security Patch', date: '2026-02-15', description: 'Applied fixes to enhance data protection.' },
];

const latestChats = [
  { id: 1, user: users[1], lastMessage: 'Hey, can you take a look at this design?', time: '10:32 AM', unread: 2 },
  { id: 2, user: users[3], lastMessage: 'Pipeline is failing again 😅', time: 'Yesterday', unread: 0 },
  { id: 3, user: users[4], lastMessage: 'Found a great dataset for the model!', time: '2 days ago', unread: 1 },
  { id: 4, user: users[0], lastMessage: 'Let’s sync up tomorrow?', time: 'Feb 14', unread: 0 },
];

export default function FeedPage() {
  const profile = myProfile;
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [postContent, setPostContent] = useState('');
  const [connections, setConnections] = useState<Connection[] | null>();
  const [connectionsSent, setConnectionsSent] = useState<Connection[] | null>();
  const [connectionsReceived, setConnectionsReceived] = useState<Connection[] | null>();
  const [conversations, setConversations ] =  useState<Conversation[] | null>();
  const [posts, setPosts] = useState<PostListResponse | null> ();
  const [post, setPost] = useState<PostResponse>({
    id: "",
    content: "",
    visibility: "PUBLIC",  
  });
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    {status:"PENDING"}
  );
  const [connectionRequest, setConnectionRequest] = useState<ConnectionRequest>(
    {
      addresseeId:""
    }
  )

  const [usersList, setUser] = useState<UserList>({
    content: [],
    totalElements: 0,
    totalPages: 0,
    page: 0,
    size: 0,
  });
  let updatedLike=0;
    
  useEffect(() => {
    getUserTree('0bcf6705-be5b-477b-aa44-b8c05e8d6ff2')
      .then(setUser)
      .catch(console.error);
  }, []);
  useEffect(()=>{
        getConnections("0bcf6705-be5b-477b-aa44-b8c05e8d6ff2");
        getConversations("0bcf6705-be5b-477b-aa44-b8c05e8d6ff2")
        getPost('60c8523c-23c7-4b7b-8a54-a9a2e69da5c4');
      
      }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) setTheme(savedTheme);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const getConnections =async(id: string) => {
    try {
      const response = await getConnection(id);
      const conReceived = await getConnectionRequestReceive(id);
      const conSent = await getConnectionRequestSend(id);
      setConnectionsReceived(conReceived.connections);
      setConnectionsSent(conSent.connections);
      setConnections(response.connections);
    } catch (error) {
      console.log(error);
    }
  }
  const getConversations = async(id: String) =>{
    try {
      const response = await getConversation(id);
      setConversations(response);
    } catch (error) {
      console.log(error);
    }
  }

const handlePost = async(post: PostResponse) => {
  try {
    await createPost(post, "60c8523c-23c7-4b7b-8a54-a9a2e69da5c4");
    setPost({
      id: "",
      content: "",
      visibility: "PUBLIC",
    });
    await getPost("60c8523c-23c7-4b7b-8a54-a9a2e69da5c4"); // ← re-fetch posts
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

const handlePostAction = async (id: String, userId: String, likeCount: any)=>{
  await updatePostLike(id, userId);
   updatedLike= likeCount+1;
  await getPost("60c8523c-23c7-4b7b-8a54-a9a2e69da5c4"); // ← re-fetch posts
}

  const updateConnection = (id: String) => {
    alert("Are you sure you want to update the connection status?");
    connectionStatus.status="ACCEPTED";
    updateConnectionStatus(id, connectionStatus)

  }

  const getPost = async(id: String) =>{
    try {
      const respone = await getPosts(id);
      setPosts(respone);
    } catch (error) {
      
    }
  }
  const handleConversation = async (perticipantId: String) => {
    const response = await getIfConversationExist("0bcf6705-be5b-477b-aa44-b8c05e8d6ff2", perticipantId);
console.log(response);
    if(!response){
    await createConversation("0bcf6705-be5b-477b-aa44-b8c05e8d6ff2", perticipantId);
    console.log("Conversation created");
    }    

      router.push('/messenger');


  }
  const sendFriendRequest = async(id: String) =>{
    await sendConnectionRequest("0bcf6705-be5b-477b-aa44-b8c05e8d6ff2", id);

  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    
      {/* Main layout */}
      <div className="flex mt-[80px] h-[calc(100vh-80px)]">
        <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 overflow-y-auto bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Branch Request</h2>
          <div className="space-y-4">
            {connectionsReceived?.map((con) => (
              <motion.div
                key={crypto.randomUUID()}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {/* <Image src="https://scontent-dus1-1.xx.fbcdn.net/v/t39.30808-6/659767570_27421711750764927_8167623756091965747_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=109&ccb=1-7&_nc_sid=dd6889&_nc_ohc=NDDy00cfWGAQ7kNvwHNws0p&_nc_oc=AdpBr2rBRCifV_lRn5hplcU_HeYv5btaVXzqKCMhezMn2s5MjrtF8kCghb4CcA4vfos&_nc_zt=23&_nc_ht=scontent-dus1-1.xx&_nc_gid=kppVDad1GmLixX7JRcv35A&_nc_ss=7a3a8&oh=00_AfyagFZBZ4AGuBOCFooNEM5iNT9G6_NqgTsXVyNeqgbnfA&oe=69D0B0BA" alt='test' width={48} height={48} className="rounded-full" /> */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{con.addresseeName}</h3>
                </div>
                  <button onClick={() =>updateConnection(con.id)} className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-sm font-medium transition-colors shrink-0">
                    Confirm
                  </button>
              </motion.div>
            ))}
          </div>
          {/* Connected branches */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Branches</h2>
          <div className="space-y-4">
            {connections?.map((con) => (
              <motion.div
                key={crypto.randomUUID()}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {/* <Image src="https://scontent-dus1-1.xx.fbcdn.net/v/t39.30808-6/659767570_27421711750764927_8167623756091965747_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=109&ccb=1-7&_nc_sid=dd6889&_nc_ohc=NDDy00cfWGAQ7kNvwHNws0p&_nc_oc=AdpBr2rBRCifV_lRn5hplcU_HeYv5btaVXzqKCMhezMn2s5MjrtF8kCghb4CcA4vfos&_nc_zt=23&_nc_ht=scontent-dus1-1.xx&_nc_gid=kppVDad1GmLixX7JRcv35A&_nc_ss=7a3a8&oh=00_AfyagFZBZ4AGuBOCFooNEM5iNT9G6_NqgTsXVyNeqgbnfA&oe=69D0B0BA" alt='test' width={48} height={48} className="rounded-full" /> */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{con.addresseeName}</h3>
                </div>
                  <button onClick={() => handleConversation(con.addresseeId)} className="shrink-0">
                  <p className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-sm font-medium transition-colors shrink-0">
                    {con.status== "ACCEPTED" ? "Send Message" : "Follow"}
                  </p>
                  </button>
              </motion.div>
            ))}
          </div>
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Suggested Branch</h2>
          <div className="space-y-4">
            {usersList.content.map((user) => (
              <motion.div
                key={user.id}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {/* <Image src="https://scontent-dus1-1.xx.fbcdn.net/v/t39.30808-6/659767570_27421711750764927_8167623756091965747_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=109&ccb=1-7&_nc_sid=dd6889&_nc_ohc=NDDy00cfWGAQ7kNvwHNws0p&_nc_oc=AdpBr2rBRCifV_lRn5hplcU_HeYv5btaVXzqKCMhezMn2s5MjrtF8kCghb4CcA4vfos&_nc_zt=23&_nc_ht=scontent-dus1-1.xx&_nc_gid=kppVDad1GmLixX7JRcv35A&_nc_ss=7a3a8&oh=00_AfyagFZBZ4AGuBOCFooNEM5iNT9G6_NqgTsXVyNeqgbnfA&oe=69D0B0BA" alt='test' width={48} height={48} className="rounded-full" /> */}
                <div className="flex-1 min-w-0">
                 <Link key={user.id} href={`/${user.id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{user.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.username}</p>
                </div>
                 
                  <button onClick={() => sendFriendRequest(user.id)} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors shrink-0">
                    Add Branch
                  </button>
              </motion.div>
            ))}
          </div>
        </div>
       

        {/* Middle: Create Post + Feed */}
        <div className="flex-1 max-w-3xl mx-auto overflow-y-auto bg-white dark:bg-gray-950 p-6 space-y-8">
          {/* Create Post */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md"
          >
            <div className="flex items-start gap-4">
              <Image
                src={profile.profilePic}
                alt="You"
                width={52}
                height={52}
                className="rounded-full ring-2 ring-teal-500/30"
              />
              <div className="flex-1">
                <textarea
                  value={post.content??''}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  placeholder="What's on your mind?"
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 min-h-[90px]"
                  rows={3}
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handlePost( { ...post, content: post.content })}
                    className="px-8 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg disabled:shadow-none"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Posts</h2>
          <div className="space-y-6">
            {posts?.content?.map((post) => (
              <motion.div
                key={crypto.randomUUID()}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  {/* <Image src={post.name} alt={post.user.name} width={48} height={48} className="rounded-full" /> */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{post.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@{post.name} · {post.createdAt}</p>
                  </div>
                </div>
                <ExpandablePostContent content={post?.content || ''} />
                <div className="flex gap-8 text-sm text-gray-600 dark:text-gray-400">
                  <button onClick={() => handlePostAction(post?.id, "60c8523c-23c7-4b7b-8a54-a9a2e69da5c4", post?.likeCount)}>
                  <span>❤️ { updatedLike==0? post.likeCount: updatedLike }</span></button>
                  <span>💬 {post.commentCount}</span>
                </div>
                <PostComment content={post.id || ''} />

              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Chats + Events + Updates */}
        <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 overflow-y-auto bg-gray-50 dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 p-6 space-y-10">
          {/* Latest Chats */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Conversations</h2>
            <div className="space-y-3">
              {conversations?.map((chat) => (
                <motion.div
                  key={1}
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer shadow-sm"
                >
                  {/* <div className="relative">
                    <Image src={chat.user.profilePic} alt={chat.user.name} width={52} height={52} className="rounded-full" />
                    {chat.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                        {chat.unread}
                      </span>
                    )}
                  </div> */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{chat.otherUsername}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{chat.unreadCount}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{event.date} · {event.location}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Latest Updates */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Updates</h2>
            <div className="space-y-4">
              {updates.map((update) => (
                <motion.div
                  key={update.id}
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">{update.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{update.date}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{update.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}