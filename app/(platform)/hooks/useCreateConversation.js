import { useRouter } from "next/navigation";
import axios from "axios";
import { useChatContext } from "../contexts/ChatContext";

export function useCreateConversation() {
  const router = useRouter();
  const { input, conversationId, setConversationId, tone, category } =
    useChatContext();

  async function createConversation() {
    if (!conversationId && input.trim()) {
      try {
        const { data } = await axios.post("/api/conversation", {
          title: input,
          tone,
          category,
        });

        console.log("Conversation created:", data);
        setConversationId(data.id);
        router.push(`/chat/${data.id}`);
        return data.id;
      } catch (err) {
        console.error("Failed to create conversation", err);
      }
    } else {
      return conversationId;
    }
  }

  return createConversation;
}
