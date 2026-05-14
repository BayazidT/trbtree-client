'use client';


import { useState, useEffect } from 'react';
import { myProfile } from '@/app/data/profile';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getUser } from '../data/user';
import { User, UserList } from '../types/auth.types';
import { Connection, ConnectionRequest, ConnectionResponseList, ConnectionStatus } from '../types/connection.types';
import { Conversation, ConversationList } from '../types/conversation.types';
import { getConnection,updateConnectionStatus, sendConnectionRequest, getConnectionRequestReceive, getConnectionRequestSend } from '../api/connectionApi';
import { getConversation } from '../api/conversationApi';
import { getPosts, createPost } from '../api/postApi';
import { PostListResponse, PostResponse } from '../types/post.types';
import { create } from 'domain';
import { get } from 'http';
import { Message } from '../types/message.types';
import { sendMessage } from '../api/messengerApi';
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [postContent, setPostContent] = useState('');
  const [connections, setConnections] = useState<Connection[] | null>();
  const [connectionsSent, setConnectionsSent] = useState<Connection[] | null>();
  const [connectionsReceived, setConnectionsReceived] = useState<Connection[] | null>();
  const [conversations, setConversations ] =  useState<Conversation[] | null>();
  const [posts, setPosts] = useState<PostListResponse | null> ();
  const [message, setMessage] = useState<Message>({
    conversationId: "",
    receiverId: "",
    content: "",
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
  })
    
  useEffect(() => {
    getUser()
      .then(setUser)
      .catch(console.error);
  }, []);
  useEffect(()=>{
        getConnections("0bcf6705-be5b-477b-aa44-b8c05e8d6ff2");
        getConversations("0bcf6705-be5b-477b-aa44-b8c05e8d6ff2")
      
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

  const handleSendMessage = async(message: Message) => {
    try {
      await sendMessage(message, "60c8523c-23c7-4b7b-8a54-a9a2e69da5c4");
      setMessage({
        conversationId: "",
        receiverId: "",
        content: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    
      {/* Main layout */}
      <div className="flex mt-[80px] h-[calc(100vh-80px)]">
        <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 overflow-y-auto bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-6 space-y-6">
         
          {/* Connected branches */}
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
        {/* Middle: Create Post + Feed */}
        <div className="flex-1 max-w-3xl mx-auto overflow-y-auto bg-white dark:bg-gray-950 p-6 space-y-8">
          {/* Create Post */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md"
          >
            <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
  {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Receiver Message */}
              <div className="flex justify-start">
                <div className="max-w-xs md:max-w-md px-4 py-3 rounded-2xl rounded-bl-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow">
                  Hey! How are you doing?
                </div>
              </div>

              {/* Sender Message */}
              <div className="flex justify-end">
                <div className="max-w-xs md:max-w-md px-4 py-3 rounded-2xl rounded-br-sm bg-teal-600 text-white shadow">
                  I'm doing great! Working on the messenger UI 😄
                </div>
              </div>

              {/* More Messages Example */}
              <div className="flex justify-start">
                <div className="max-w-xs md:max-w-md px-4 py-3 rounded-2xl rounded-bl-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow">
                  Nice! It already looks good.
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="flex items-end gap-3">
                
                <textarea
                  value={message.content}
                  onChange={(e) =>
                    setMessage({ ...message, content: e.target.value })
                  }
                  placeholder="Type a message..."
                  rows={1}
                  className="flex-1 resize-none rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                <button
                  onClick={() =>
                    handleSendMessage({
                      ...message,
                      content: message.content, conversationId:"fe849066-2cfa-4db0-9dac-59806cc5a4de",
                      receiverId: "60c8523c-23c7-4b7b-8a54-a9a2e69da5c4"
                    })
                  }
                  className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-full transition-all shadow-md"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
          </motion.div>

          
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