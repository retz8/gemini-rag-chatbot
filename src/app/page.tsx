"use client";

import SendIcon from "@/components/icons/SendIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();

  console.log("data: ", data);
  return (
    <section
      className="flex flex-col justify-center items-center
     h-screen bg-white p-2 mx-auto max-w-full"
    >
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}
      <form
        className="fixed bottom-0 mb-10
        flex items-center gap-2 w-96"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Type your message here..."
          className="flex-1 rounded-2xl border border-muted px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          value={input}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          className="rounded-full bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90"
        >
          <SendIcon className="w-5 h-5" />
        </Button>
      </form>
    </section>
  );
}
