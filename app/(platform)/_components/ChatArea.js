"use client";

import { cn } from "@/lib/utils";
import { useChatContext } from "../contexts/ChatContext";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/app/libs/message";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Bot } from "lucide-react";
import Loading from "@/app/loading";
import Spinner from "./Spinner";

export default function ChatArea() {
  const { setMessages } = useChatContext();
  const { user } = useUser();
  const params = useParams();
  const conversationId = params?.convId;

  const { isLoading, data } = useQuery({
    queryFn: async () => {
      const messages = await getMessages(conversationId);
      setMessages(messages[0]?.messages || []);
      return messages[0]?.messages || [];
    },
    queryKey: ["messages", conversationId],
    enabled: !!conversationId,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="flex justify-center items-center h-full w-full ">
      <div className="w-full max-w-md b flex flex-col bg-muted dark:bg-[#242424] rounded-2xl shadow-lg p-6 gap-4">
        {data.length ? (
          data.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "flex items-end gap-2",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "user" ? (
                <img
                  src={user?.imageUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-primary dark:bg-[#2C2C2C] dark:text-[#E4E4E4] text-primary-foreground flex items-center justify-center rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={cn(
                  "max-w-[75%] px-5 py-3 text-sm break-words",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm dark:bg-[#313131] dark:text-[#E4E4E4]"
                    : "bg-white dark:bg-[#474747] dark:text-[#E4E4E4] text-gray-900 rounded-2xl rounded-bl-sm shadow-sm"
                )}
              >
                {msg.text}
              </div>
            </div>
          ))
        ) : (
          // <p className="flex justify-center items-center h-full text-muted-foreground">
          //   No messages.
          // </p>
          <Spinner />
        )}
      </div>
    </div>
  );
}
