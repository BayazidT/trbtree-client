import { fetchAPI } from '../lib/api';
import { ConversationList, Conversation } from '../types/conversation.types';



export const getConversation = async(id: String): Promise<Conversation[]> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/conversation/${id}`);
};

export const getIfConversationExist = async(id: String, participantId: String): Promise<Boolean[]> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/conversation/${id}`);
};

export const createConversation = async(userId: String, reparticipantIds: String) =>{
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/conversation/${userId}`,
    {method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {reparticipantIds}}
  )
}