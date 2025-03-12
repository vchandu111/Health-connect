import { sendMessageToDialogflow } from '../Services/DialogflowService';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet() {
    const message = this.createChatBotMessage("Hello! How can I assist you?");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }

  async handleUserMessage(message) {
    const response = await sendMessageToDialogflow(message);
    const botMessage = this.createChatBotMessage(response);
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  // Add more actions here
}

export default ActionProvider; 