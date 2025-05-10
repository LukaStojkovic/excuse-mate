import axios from "axios";

export async function saveMessage({ conversationId, userMessage, aiMessage }) {
  try {
    await axios.post("/api/message", {
      conversationId,
      userMessage,
      aiMessage,
    });
  } catch (err) {
    console.error("Failed to save message", err);
  }
}

export async function getMessages(conversationId) {
  try {
    const messages = await axios.get(
      `/api/message?conversationId=${conversationId}`
    );

    return messages.data;
  } catch (err) {
    console.error("Failed to get messages", err);
    return [];
  }
}

export async function getConversations() {
  try {
    const conversations = await axios.get(`/api/conversation`);

    return conversations.data;
  } catch (err) {
    console.error("Failed to get conversations", err);
    return [];
  }
}
