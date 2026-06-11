import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"

import { useState } from "react"

// Titel, beskrivning, bild -> Publicera
export default function CreatePost() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/users/posts",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  }

  return (
    <Card className="min-h-screen justify-center bg-[#E6DECF] shadow-xl border border-black/5 w-full max-w-xl rounded-3xl">
      < CardHeader>
        <CardTitle className="text-center text-3xl pb-4">
          Create Your Post
        </CardTitle>
      </CardHeader>

      <CardContent className="font-mono px-8 pb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <Input type="text" placeholder="Title" value={title} className="text-sm bg-[#edeae3]" onChange={(e) => setTitle(e.target.value)} />

          <Textarea className="text-sm min-h-40 bg-[#edeae3] p-4 rounded-3xl"
            placeholder="Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button type="submit" className="w-full text-[#E6DECF] hover:bg-[#CB3038] hover:text-white">
            Publish
          </Button>
        </form>
      </CardContent>
    </Card >
  )
}