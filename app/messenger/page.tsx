'use client';

import { useState, useEffect } from 'react';
import { myProfile } from '@/app/data/profile';
import { motion } from 'framer-motion';

import {
  Connection,
  ConnectionRequest,
  ConnectionStatus,
} from '../types/connection.types';

import { Conversation } from '../types/conversation.types';

import {
  getConnection,
  getConnectionRequestReceive,
  getConnectionRequestSend,
} from '../api/connectionApi';

import { getConversation } from '../api/conversationApi';

import { Message } from '../types/message.types';

import { sendMessage, getMessages } from '../api/messengerApi';

const cardHover = {
  rest: { y: 0, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
  hover: { y: -4, boxShadow: '0 15px 30px rgba(0,0,0,0.3)' },
};

const events = [
  {
    id: 1,
    title: 'Tech Conference 2026',
    date: '2026-03-15',
    description:
      'Annual tech gathering with keynote speakers on AI and ML.',
    location: 'San Francisco, CA',
  },
];

const updates = [
  {
    id: 1,
    title: 'New Feature Release',
    date: '2026-02-16',
    description:
      'Introduced dark mode toggle for better user experience.',
  },
];

export default function FeedPage() {
  const profile = myProfile;

  const currentUserId = '0bcf6705-be5b-477b-aa44-b8c05e8d6ff2';

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [connections, setConnections] =
    useState<Connection[] | null>();

  const [connectionsSent, setConnectionsSent] =
    useState<Connection[] | null>();

  const [connectionsReceived, setConnectionsReceived] =
    useState<Connection[] | null>();

  const [conversations, setConversations] =
    useState<Conversation[] | null>([]);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [messages, setMessages] = useState<any[]>([]);

  const [message, setMessage] = useState<Message>({
    conversationId: '',
    receiverId: '',
    content: '',
  });

  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>({
      status: 'PENDING',
    });

  const [connectionRequest, setConnectionRequest] =
    useState<ConnectionRequest>({
      addresseeId: '',
    });

  useEffect(() => {
    getConnections(currentUserId);
    getConversations(currentUserId);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      'theme'
    ) as 'light' | 'dark' | null;

    if (savedTheme) setTheme(savedTheme);
    else if (
      window.matchMedia('(prefers-color-scheme: dark)')
        .matches
    )
      setTheme('dark');
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const getConnections = async (id: string) => {
    try {
      const response = await getConnection(id);

      const conReceived =
        await getConnectionRequestReceive(id);

      const conSent = await getConnectionRequestSend(id);

      setConnectionsReceived(conReceived.connections);
      setConnectionsSent(conSent.connections);
      setConnections(response.connections);
    } catch (error) {
      console.log(error);
    }
  };

  const getConversations = async (id: string) => {
    try {
      const response = await getConversation(id);

      setConversations(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessageList = async (
    conversationId: string
  ) => {
    try {
      const response = await getMessages(conversationId);

      setMessages(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConversationSelect = async (
    chat: Conversation
  ) => {
    setSelectedConversation(chat);

    setMessage({
      conversationId: chat.conversationId,
      receiverId: chat?.otherUserId,
      content: '',
    });

    await getMessageList(chat?.conversationId);
  };

  const handleSendMessage = async (
    message: Message
  ) => {
    if (!message.content.trim()) return;

    try {
      await sendMessage(
        message,
        message.receiverId
      );

      await getMessageList(message.conversationId);

      setMessage((prev) => ({
        ...prev,
        content: '',
      }));
    } catch (error) {
      console.error(
        'Error sending message:',
        error
      );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex mt-[80px] h-[calc(100vh-80px)]">
        
        {/* LEFT SIDEBAR */}
        <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 overflow-y-auto bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-6">
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Conversations
          </h2>

          <div className="space-y-3">
            {conversations?.map((chat) => (
              <motion.div
                key={crypto.randomUUID()}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                onClick={() =>
                  handleConversationSelect(chat)
                }
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all shadow-sm
                ${
                  selectedConversation?.conversationId === chat?.conversationId
                    ? 'bg-teal-100 dark:bg-teal-900 border-teal-500'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {chat.otherUsername}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {chat.lastMessage}
                  </p>
                </div>

                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {chat.unreadCount}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CENTER CHAT */}
        <div className="flex-1 max-w-4xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md h-[calc(100vh-130px)] flex flex-col"
          >
            
            {/* CHAT HEADER */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                {selectedConversation
                  ? selectedConversation.otherUsername
                  : 'Select a conversation'}
              </h2>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-950">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No messages yet
                </div>
              ) : (
                messages.map((msg: any) => {
                  const isSender =
                    msg.senderId === currentUserId;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isSender
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow text-sm break-words
                        ${
                          isSender
                            ? 'bg-teal-600 text-white rounded-br-sm'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* INPUT */}
            {selectedConversation && (
              <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                <div className="flex items-end gap-3">
                  
                  <textarea
                    value={message.content}
                    onChange={(e) =>
                      setMessage({
                        ...message,
                        content: e.target.value,
                      })
                    }
                    placeholder="Type a message..."
                    rows={1}
                    className="flex-1 resize-none rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <button
                    onClick={() =>
                      handleSendMessage(message)
                    }
                    className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-full transition-all shadow-md"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 overflow-y-auto bg-gray-50 dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 p-6 space-y-10">
          
          {/* EVENTS */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Upcoming Events
            </h2>

            <div className="space-y-4">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {event.date} · {event.location}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* UPDATES */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Latest Updates
            </h2>

            <div className="space-y-4">
              {updates.map((update) => (
                <motion.div
                  key={update.id}
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">
                    {update.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {update.date}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {update.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}