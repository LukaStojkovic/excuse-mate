"use client";

import { generateExcuse } from "@/app/libs/gemini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { useChatContext } from "../contexts/ChatContext";
import { useCreateConversation } from "../hooks/useCreateConversation";
import { saveMessage } from "@/app/libs/message";
import { useQueryClient } from "@tanstack/react-query";
import { useProModal } from "../hooks/useProModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatInput() {
  const queryClient = useQueryClient();
  const {
    tone,
    category,
    input,
    setInput,
    setMessages,
    conversationId,
    setConversationId,
  } = useChatContext();
  const proModal = useProModal();
  const createConversation = useCreateConversation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setConversationId(null);
    setMessages([]);
  }, [setConversationId, setMessages]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (input.trim() === "" || !tone || !category) return;

      const response = await generateExcuse(input, tone, category);

      let convoId = conversationId;

      if (!convoId) {
        convoId = await createConversation();
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", text: input },
        { role: "ai", text: response },
      ]);

      setInput("");

      await saveMessage({
        conversationId: convoId,
        userMessage: input,
        aiMessage: response,
      });

      queryClient.invalidateQueries(["messages", convoId]);
    } catch (error) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center gap-2 bg-muted rounded-full px-4 py-2 shadow-md"
      >
        <Input
          className="flex-1 border-0 shadow-none bg-transparent dark:bg-[#262626] focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground"
          placeholder="Briefly explain what happened..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="submit"
          size="sm"
          className="rounded-full px-4 py-2 text-sm flex items-center gap-1 bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
          disabled={!input || !tone || !category || isLoading}
        >
          <Sparkles className="w-4 h-4" />
          {isLoading ? "Generating..." : "Generate"}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-4">
        This app is for fun! Excuses may not be accurate or appropriate for real
        situations.
      </p>
    </>
  );
}
