import { fetchAPI } from "../lib/api";
import { Message } from "../types/message.types";

export const sendMessage = async (message: Message, userId: string) => {
 return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/message/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: message
  }); 
}