import { fetchAPI } from '../lib/api';
import { ConversationList, Conversation } from '../types/conversation.types';



export const getConversation = async(id: String): Promise<Conversation[]> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/conversation/${id}`);
};