import Chat from "@/app/(platform)/_components/Chat";

export default function ConversationPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 max-w-3xl mx-auto">
      <Chat isConversation={true} />
    </div>
  );
}
