import { Message } from "../../models/index";
import { pubsub } from "../../subscriptions";

const addMessage = (obj, args, context) => {
	return Message.create({
		text: args.text,
		userId: args.userId,
		chatroomId: args.chatroomId,
		sentAt: Date.now(),
		receivedAt: Date.now() //TODO remove, doesn't make sense
	})
		.then(message => {
			return message.dataValues;
		})
		.then(message => {
			pubsub.publish("messageAdded", { messageAdded: message });
		})
		.catch(e => {
			console.error(e);
		});
};

export { addMessage };
