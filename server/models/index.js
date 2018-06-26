import Sequelize from "sequelize";
import casual from "casual";
import { sqlite as db } from "./connectors";
import { times } from "lodash";

const Chatroom = db.define("chatroom", {
	title: { type: Sequelize.STRING }
});

const Message = db.define("message", {
	text: { type: Sequelize.STRING },
	createdAt: { type: Sequelize.DATE, defaultValue: Date.now() }
});

const User = db.define("user", {
	displayName: { type: Sequelize.STRING }
});

const FcmToken = db.define("fcmToken", {
	token: { type: Sequelize.STRING }
});

const oneHour = Date.now() + 3600;

const Poll = db.define("poll", {
	title: { type: Sequelize.STRING },
	expiresAt: { type: Sequelize.DATE, defaultValue: oneHour },
	createdAt: { type: Sequelize.DATE, defaultValue: Date.now() },
	//allowedResponses: [String]
	response: String,
	readAt: { type: Sequelize.DATE },
	archivedAt: { type: Sequelize.DATE }
	//	category: [String]
});

// fcmTokens

Message.belongsTo(User);
Message.belongsTo(Chatroom);
Chatroom.hasMany(User);
Chatroom.hasMany(Message);
FcmToken.belongsTo(User);
User.belongsTo(Chatroom);
Poll.belongsTo(User);
User.hasMany(Poll);
User.hasMany(Message);
User.hasMany(FcmToken);

if (process.env.NODE_ENV === "production") {
	casual.seed(123);
	db.sync({ force: true }).then(() => {
		const jaime = User.create({ displayName: "Jaime Agudo" });
		times(6, () => {
			Chatroom.create({
				title: casual.words(1)
			}).then(chatroom => {
				times(5, () => {
					chatroom.createUser();
					return chatroom
						.createUser({
							displayName: casual.first_name
						})
						.then(user => {
							return chatroom.createMessage({
								text: casual.sentences(1),
								userId: user.dataValues.id,
								createdAt: casual.unix_time
							});
						});
				});
			});
		});
	});
}

export { Chatroom, User, Message };
