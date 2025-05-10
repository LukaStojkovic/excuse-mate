"use client";

import ChatArea from "./ChatArea";

export default function Chat({ isConversation }) {
  return (
    <>
      {/* Tone and Category */}
      {/* <OptionsPicker /> */}

      {/* Chat Area */}
      {isConversation && <ChatArea />}

      {/* Chat Input */}
      {/* <ChatInput /> */}
    </>
  );
}
