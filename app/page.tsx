'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './stores/auth-store';
import { myProfile } from '@/app/data/profile';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { getUserTree } from './data/user';
import { UserList } from './types/auth.types';
import {
  Connection,
  ConnectionRequest,
  ConnectionStatus,
} from './types/connection.types';
import { Conversation } from './types/conversation.types';

import {
  getConnection,
  updateConnectionStatus,
  sendConnectionRequest,
  getConnectionRequestReceive,
  getConnectionRequestSend,
} from './api/connectionApi';

import {
  createConversation,
  getConversation,
  getIfConversationExist,
} from './api/conversationApi';

import {
  getPosts,
  createPost,
  updatePost,
  updatePostLike,
  deletePostById
} from './api/postApi';

import {
  PostListResponse,
  PostResponse,
} from './types/post.types';

import ExpandablePostContent from './components/ExpandablePostContent';
import PostComment from './components/PostComment';


const cardHover = {
  rest: {
    y: 0,
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  hover: {
    y: -4,
    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
  },
};


// Mock data
const users = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    profilePic: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    profilePic: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    username: 'alicej',
    profilePic: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 4,
    name: 'Bob Brown',
    username: 'bobbrown',
    profilePic: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 5,
    name: 'Eve Davis',
    username: 'evedavis',
    profilePic: '/placeholder.svg?height=40&width=40',
  },
];


const events = [
  {
    id: 1,
    title: 'Tech Conference 2026',
    date: '2026-03-15',
    description:
      'Annual tech gathering with keynote speakers on AI and ML.',
    location: 'San Francisco, CA',
  },
  {
    id: 2,
    title: 'Web Dev Workshop',
    date: '2026-04-02',
    description:
      'Hands-on session on modern web frameworks.',
    location: 'Online',
  },
  {
    id: 3,
    title: 'Design Meetup',
    date: '2026-05-10',
    description:
      'Networking event for designers and creatives.',
    location: 'New York, NY',
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
  {
    id: 2,
    title: 'Security Patch',
    date: '2026-02-15',
    description:
      'Applied fixes to enhance data protection.',
  },
];


const latestChats = [
  {
    id: 1,
    user: users[1],
    lastMessage: 'Hey, can you take a look at this design?',
    time: '10:32 AM',
    unread: 2,
  },
  {
    id: 2,
    user: users[3],
    lastMessage: 'Pipeline is failing again 😅',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: 3,
    user: users[4],
    lastMessage: 'Found a great dataset for the model!',
    time: '2 days ago',
    unread: 1,
  },
  {
    id: 4,
    user: users[0],
    lastMessage: 'Let’s sync up tomorrow?',
    time: 'Feb 14',
    unread: 0,
  },
];


export default function FeedPage() {
  const profile = myProfile;
  const router = useRouter();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [connections, setConnections] =
    useState<Connection[] | null>(null);

  const [connectionsSent, setConnectionsSent] =
    useState<Connection[] | null>(null);

  const [connectionsReceived, setConnectionsReceived] =
    useState<Connection[] | null>(null);

  const [conversations, setConversations] =
    useState<Conversation[] | null>(null);

  const [posts, setPosts] =
    useState<PostListResponse | null>(null);

  const [post, setPost] = useState<PostResponse>({
    id: '',
    content: '',
    visibility: 'PUBLIC',
  });

  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>({
      status: 'PENDING',
    });

  const [connectionRequest, setConnectionRequest] =
    useState<ConnectionRequest>({
      addresseeId: '',
    });

  const [usersList, setUsersList] =
    useState<UserList>({
      content: [],
      totalElements: 0,
      totalPages: 0,
      page: 0,
      size: 0,
    });
    const [editingPostId, setEditingPostId] = useState<String | null>(null);
    const [editingContent, setEditingContent] = useState('');
    const [savingPost, setSavingPost] = useState(false);

  /*
   * ============================================================
   * ZUSTAND AUTHENTICATION
   * ============================================================
   */

  const {
    user,
    loading: authLoading,
    initialized,
    loadUser,
  } = useAuthStore();


  /*
   * ============================================================
   * LOAD AUTHENTICATED USER
   * ============================================================
   *
   * We do NOT use localStorage for userId anymore.
   *
   * The authenticated user comes from Zustand.
   */

  useEffect(() => {
    if (!initialized) {
      loadUser();
    }
  }, [initialized, loadUser]);


  /*
   * ============================================================
   * LOAD USER-DEPENDENT DATA
   * ============================================================
   *
   * This runs whenever Zustand receives the authenticated user.
   */

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const userId = user.id;

    getUserTree(userId)
      .then(setUsersList)
      .catch((error) => {
        console.error('Failed to load user tree:', error);
      });

    getConnections(userId);
    getConversations(userId);
    getPost(userId);
  }, [user?.id]);


  /*
   * ============================================================
   * THEME
   * ============================================================
   */

  useEffect(() => {
    const savedTheme =
      localStorage.getItem('theme') as
        | 'light'
        | 'dark'
        | null;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (
      window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
    ) {
      setTheme('dark');
    }
  }, []);


  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);


  /*
   * ============================================================
   * CONNECTIONS
   * ============================================================
   */

  const getConnections = async (userId: string) => {
    try {
      const response = await getConnection(userId);

      const conReceived =
        await getConnectionRequestReceive(userId);

      const conSent =
        await getConnectionRequestSend(userId);

      setConnectionsReceived(
        conReceived.connections
      );

      setConnectionsSent(
        conSent.connections
      );

      setConnections(
        response.connections
      );
    } catch (error) {
      console.error(
        'Failed to load connections:',
        error
      );
    }
  };


  /*
   * ============================================================
   * CONVERSATIONS
   * ============================================================
   */

  const getConversations = async (userId: string) => {
    try {
      const response =
        await getConversation(userId);

      setConversations(response);
    } catch (error) {
      console.error(
        'Failed to load conversations:',
        error
      );
    }
  };


  /*
   * ============================================================
   * POSTS
   * ============================================================
   */

  const getPost = async (userId: string) => {
    try {
      const response =
        await getPosts(userId);

      setPosts(response);
    } catch (error) {
      console.error(
        'Failed to load posts:',
        error
      );
    }
  };


  /*
   * ============================================================
   * CREATE POST
   * ============================================================
   */

  const handlePost = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!user?.id) {
      alert('You must be logged in to create a post.');
      return;
    }

    if (!post?.content?.trim()) {
      alert('You have nothing to post!');
      return;
    }

    try {
      await createPost(
        post,
        user.id
      );

      setPost({
        id: '',
        content: '',
        visibility: 'PUBLIC',
      });

      await getPost(user.id);
    } catch (error) {
      console.error(
        'Error creating post:',
        error
      );
    }
  };


  /*
   * ============================================================
   * LIKE POST
   * ============================================================
   */

  const handlePostAction = async (
    postId: String,
    likeCount: any
  ) => {
    if (!user?.id) {
      return;
    }

    try {
      await updatePostLike(
        postId,
        user.id
      );

      await getPost(user.id);
    } catch (error) {
      console.error(
        'Error updating post like:',
        error
      );
    }
  };


  /*
   * ============================================================
   * EDIT POST
   * ============================================================
   */

  const editPost = (post: PostResponse) => {
  setEditingPostId(post?.id);
  setEditingContent(post?.content || ''); 
};

  /*
   * ============================================================
   * UPDATE CONNECTION
   * ============================================================
   */

  const updateConnection = async (
    connectionId: String
  ) => {
    try {
      const confirmed =
        window.confirm(
          'Are you sure you want to update the connection status?'
        );

      if (!confirmed) {
        return;
      }

      const updatedStatus: ConnectionStatus = {
        status: 'ACCEPTED',
      };

      await updateConnectionStatus(
        connectionId,
        updatedStatus
      );

      if (user?.id) {
        await getConnections(user.id);
      }
    } catch (error) {
      console.error(
        'Failed to update connection:',
        error
      );
    }
  };


  /*
   * ============================================================
   * CREATE / OPEN CONVERSATION
   * ============================================================
   */

  const handleConversation = async (
    participantId: String
  ) => {
    if (!user?.id) {
      return;
    }

    try {
      const response =
        await getIfConversationExist(
          user.id,
          participantId
        );

      if (!response) {
        await createConversation(
          user.id,
          participantId
        );
      }

      router.push('/messenger');
    } catch (error) {
      console.error(
        'Failed to open conversation:',
        error
      );
    }
  };


  /*
   * ============================================================
   * SEND FRIEND REQUEST
   * ============================================================
   */

  const sendFriendRequest = async (
    targetUserId: string
  ) => {
    if (!user?.id) {
      return;
    }

    try {
      await sendConnectionRequest(
        user.id,
        targetUserId
      );

      await getConnections(user.id);
    } catch (error) {
      console.error(
        'Failed to send connection request:',
        error
      );
    }
  };


  /*
   * ============================================================
   * AUTH LOADING
   * ============================================================
   */

  if (!initialized || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <p>Loading...</p>
      </div>
    );
  }


  /*
   * ============================================================
   * NOT AUTHENTICATED
   * ============================================================
   */

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Please sign in
          </h1>

          <button
            onClick={() => router.push('/signin')}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const saveEditedPost = async (postId: String) => {
  if (!user?.id) return;

  if (!editingContent.trim()) {
    alert('Post cannot be empty.');
    return;
  }

  try {
    setSavingPost(true);

    // Replace this with your actual updatePost API function
    await updatePost(postId, {
      content: editingContent,
    });

    // Reload posts
    await getPost(user.id);

    // Exit edit mode
    setEditingPostId(null);
    setEditingContent('');
  } catch (error) {
    console.error('Failed to update post:', error);
    alert('Failed to update post.');
  } finally {
    setSavingPost(false);
  }
};

const deletePost = async (id: String) =>{
  await deletePostById(id);
  await getPosts(user.id);
}


  /*
   * ============================================================
   * PAGE
   * ============================================================
   */

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Main layout */}
      <div className="flex mt-[80px] h-[calc(100vh-80px)]">

        {/* =====================================================
            LEFT SIDEBAR
        ====================================================== */}

        <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 overflow-y-auto bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-6 space-y-6">

          {/* Branch Requests */}

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Branch Request
          </h2>

          <div className="space-y-4">

            {connectionsReceived?.map((con) => (
              <motion.div
                key={null}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {con.addresseeName}
                  </h3>
                </div>

                <button
                  onClick={() =>
                    updateConnection(con.id)
                  }
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-sm font-medium transition-colors shrink-0"
                >
                  Confirm
                </button>
              </motion.div>
            ))}

          </div>


          {/* Connected Branches */}

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Branches
          </h2>

          <div className="space-y-4">

            {connections?.map((con) => (
              <motion.div
                key={null}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >

                <div className="flex-1 min-w-0">

                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {con.addresseeName}
                  </h3>

                </div>

                <button
                  onClick={() =>
                    handleConversation(
                      con.addresseeId
                    )
                  }
                  className="shrink-0"
                >
                  <p className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-sm font-medium transition-colors">
                    {con.status === 'ACCEPTED'
                      ? 'Send Message'
                      : 'Follow'}
                  </p>
                </button>

              </motion.div>
            ))}

          </div>


          {/* Suggested Branches */}

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Suggested Branch
          </h2>

          <div className="space-y-4">

            {usersList.content.map((suggestedUser) => (
              <motion.div
                key={suggestedUser.id}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >

                <div className="flex-1 min-w-0">

                  <Link
                    href={`/${suggestedUser.id}`}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {suggestedUser.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {suggestedUser.username}
                  </p>

                </div>

                <button
                  onClick={() =>
                    sendFriendRequest(
                      suggestedUser.id
                    )
                  }
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors shrink-0"
                >
                  Add Branch
                </button>

              </motion.div>
            ))}

          </div>

        </div>


        {/* =====================================================
            MIDDLE - CREATE POST + FEED
        ====================================================== */}

        <div className="flex-1 max-w-3xl mx-auto overflow-y-auto bg-white dark:bg-gray-950 p-6 space-y-8">

          {/* Create Post */}

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
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

                <form
                  onSubmit={handlePost}
                  className="max-w-3xl mx-auto p-3 rounded-lg"
                >

                  <textarea
                    value={post.content}
                    onChange={(e) =>
                      setPost({
                        ...post,
                        content: e.target.value,
                      })
                    }
                    placeholder="Write, what's on your mind."
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500"
                    required
                  />

                  <div className="flex justify-end mt-4">

                    <button
                      type="submit"
                      className="px-4 py-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg disabled:shadow-none"
                    >
                      Submit
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </motion.div>


          {/* Posts */}

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Latest Posts
          </h2>

          <div className="space-y-6">

            {posts?.content?.map((postItem) => (
              <motion.div
                key={null}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow"
              >

                <div className="flex items-center gap-4 mb-4">

                  <div className="flex items-end">

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {postItem.name}
                    </h3>

                    <div className="flex justify-end mt-4 ml-3">

                      {user?.name === postItem.name && (
                       <div className='flex flex-end'>
                         <button
                          onClick={() =>
                            editPost(postItem)
                          }
                        >
                          Edit
                        </button> | 
                        <button
                          onClick={() =>
                            deletePost(postItem?.id)
                          }
                          className='m-1
                                text-red-700 dark:text-red-300
                                hover:bg-gray-100
                                dark:hover:bg-gray-800'
                        >
                          Delete
                        </button>
                        </div>
                      )}

                    </div>

                  </div>

                </div>


                {editingPostId === postItem.id ? (
                <div className="mt-4">

                  <textarea
                    value={editingContent}
                    onChange={(e) =>
                      setEditingContent(e.target.value)
                    }
                    autoFocus
                    rows={5}
                    className="w-full p-4 rounded-lg border border-gray-300
                              dark:border-gray-600
                              bg-white dark:bg-gray-800
                              text-gray-900 dark:text-gray-100
                              focus:outline-none
                              focus:ring-2
                              focus:ring-teal-500
                              resize-y"
                  />

                  <div className="flex justify-end gap-3 mt-3">

                    <button
                      type="button"
                      onClick={() => {
                        setEditingPostId(null);
                        setEditingContent('');
                      }}
                      className="px-4 py-2 rounded-full
                                border border-gray-300
                                dark:border-gray-600
                                text-gray-700 dark:text-gray-300
                                hover:bg-gray-100
                                dark:hover:bg-gray-800"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        saveEditedPost(postItem?.id)
                      }
                      disabled={savingPost}
                      className="px-5 py-2 rounded-full
                                bg-teal-600
                                hover:bg-teal-700
                                text-white
                                disabled:bg-gray-400
                                disabled:cursor-not-allowed"
                    >
                      {savingPost ? 'Saving...' : 'Save'}
                    </button>

                  </div>

                </div>
              ) : (
                <ExpandablePostContent
                  content={postItem?.content || ''}
                />
              )}


                <div className="flex gap-8 text-sm text-gray-600 dark:text-gray-400">

                  <button
                    onClick={() =>
                      handlePostAction(
                        postItem?.id,
                        postItem?.likeCount
                      )
                    }
                  >
                    <span>
                      ❤️ {postItem.likeCount}
                    </span>
                  </button>

                  <span>
                    💬 {postItem.commentCount}
                  </span>

                </div>


                <PostComment
                  content={postItem.id || ''}
                />

              </motion.div>
            ))}

          </div>

        </div>


        {/* =====================================================
            RIGHT SIDEBAR
        ====================================================== */}

        <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 overflow-y-auto bg-gray-50 dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 p-6 space-y-10">

          {/* Conversations */}

          <div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Conversations
            </h2>

            <div className="space-y-3">

              {conversations?.map((chat) => (
                <motion.div
                  key={null}
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer shadow-sm"
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


          {/* Upcoming Events */}

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
                  className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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


          {/* Latest Updates */}

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
                  className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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