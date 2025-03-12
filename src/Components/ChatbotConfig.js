import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "HealthBot",
  initialMessages: [createChatBotMessage("Hi, how can I help you today?")],
  // Add more configuration options here
};

export default config; 