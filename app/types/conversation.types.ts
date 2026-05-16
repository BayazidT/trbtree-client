export interface Conversation{
    conversationId: string,
    type?: string,
    otherUserId: string,
    otherUsername: string,
    lastMessage?: string,
    unreadCount?: number
}
export interface ConversationList{
    conversationList: Conversation
}

//  "conversationId": "fe849066-2cfa-4db0-9dac-59806cc5a4de",
//     "type": null,
//     "otherUserId": "60c8523c-23c7-4b7b-8a54-a9a2e69da5c4",
//     "otherUsername": "bt",
//     "lastMessage": null,
//     "lastMessageAt": null,
//     "unreadCount": 0