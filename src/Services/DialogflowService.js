import { SessionsClient } from 'dialogflow';

const projectId = 'your-dialogflow-project-id';
const sessionId = 'some-session-id';
const languageCode = 'en-US';

const sessionClient = new SessionsClient();

export const sendMessageToDialogflow = async (message) => {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  return result.fulfillmentText;
}; 