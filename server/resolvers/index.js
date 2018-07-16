import { ChatroomResolve, MessageResolve } from "./associations";
import {
	chatrooms,
	chatroom,
	chatroomByTitle,
	users,
	user,
	messages,
	CurrentUser
} from "./query";

import { addMessage } from "./mutation";
import { messageAdded } from "./subscription";

const resolvers = {
	Query: {
		CurrentUser,
		chatrooms,
		chatroom,
		chatroomByTitle,
		users,
		user,
		messages
	},
	Chatroom: ChatroomResolve,
	Message: MessageResolve,
	Mutation: {
		addMessage
	},
	Subscription: {
		messageAdded
	}
};
export default resolvers;
