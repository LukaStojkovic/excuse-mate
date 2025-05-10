"use client";

import { useQuery } from "@tanstack/react-query";
import { getConversations } from "@/app/libs/message";
import Link from "next/link";
import {
  Library,
  MessageSquare,
  MessageSquareOff,
  Volume2,
} from "lucide-react";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";

export default function RecentPage() {
  const { isLoading, data } = useQuery({
    queryFn: async () => {
      return await getConversations();
    },
    queryKey: ["conversations"],
  });

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col items-center min-h-screen bg-background py-8 px-4 dark:bg-[#2C2C2C]">
      <div className="w-full max-w-2xl space-y-4">
        {data.length ? (
          data.map((conversation) => (
            <Link
              href={`/chat/${conversation.id}`}
              key={conversation.id}
              className="flex items-center justify-between w-full p-4 bg-muted rounded-xl hover:bg-muted/70 transition group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary text-primary-foreground p-2 rounded-full">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-base font-semibold text-foreground flex flex-col">
                  <span className="hover:underline">{conversation.title}</span>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Library className="w-4 h-4" />
                      <span className="capitalize">
                        {conversation.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Volume2 className="w-4 h-4" />
                      <span className="capitalize">{conversation.tone}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(conversation.createdAt).toLocaleDateString()}
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="bg-muted p-4 rounded-full">
              <MessageSquareOff className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              No excuses yet
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs">
              Looks like you haven&apos;t created any excuses yet. Start
              crafting some!
            </p>
            <Button className="cursor-pointer" asChild>
              <Link href="/chat">Create your first excuse</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
