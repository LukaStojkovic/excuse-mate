"use client";

const { createContext, useState, useContext } = require("react");

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [tone, setTone] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  const states = {
    tone,
    setTone,
    category,
    setCategory,
    input,
    setInput,
    messages,
    setMessages,
    setConversationId,
    conversationId,
  };

  return <ChatContext.Provider value={states}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
