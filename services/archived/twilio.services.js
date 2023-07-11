const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendMessage = (recipient, body) => {
  client.messages
  .create({ body: "Hello from Twilio", from: "+18554811454", to: recipient })
  .then(message => console.log(message.sid));
}

const createConversation = (req, res, next) => {
  console.log("CREATE CONVERSATION");

  if (!res.locals.conversationSid) {
    client.conversations.conversations.create({ friendlyName: 'Friendly Conversation' })
    .then((conversation) => {
      res.locals.conversationSid = conversation.sid;

      next();
    })
    .catch((err) => console.log("Error in 'createConversation' middleware: ", err));  
  }
};

const addMessageToConversation = async (conversationSid, body) => {
  console.log("ADD MESSAGE TO CONVERSATION");

  if (conversationSid) {
    await client.conversations.conversations(conversationSid).messages.create({ body: body })
    .catch((err) => console.log("Error in 'sendMessageToParticipant' middleware: ", err));
  }

  return;
};

const listAllMessagesWithParticpant = async (conversationSid) => {
  console.log("LIST ALL MESSAGES");

  if (conversationSid) {
    await client.conversations.conversations(conversationSid).messages.list({}).then((messages) => {
      res.locals.messages = messages;

      res.locals.participantId;
    })
    .catch((err) => console.log("Error in 'listAllMessagesWithParticpant' middleware: ", err));
  }

  return;
};

const deleteConversation = (req, res, next) => {
  const { conversationSid } = req.body;

  res.locals.conversationSid = conversationSid;

  client.conversations.conversations(conversationSid).remove().then(() => next())
  .catch((err) => console.log("Error in 'deleteConversation' middleware: ", err));
}

module.exports = {
  sendMessage,
  createConversation,
  addMessageToConversation,
  listAllMessagesWithParticpant,
  deleteConversation
};