import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"
import { enUS } from "date-fns/locale";
import React, { useState } from "react"
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/posts",
      {
        method: "POST",
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

    if (response.ok) {
      navigate("/");
    }
  }

  return (
    <div className="bg-[#CB3038] min-h-screen flex items-center justify-center gap-8">
      <Card className="h-fit p-6 rounded-3xl">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={enUS}
          className="rounded-lg"
          captionLayout="dropdown"
        />
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1
          )}
          locale={enUS}
          className="rounded-lg"
          captionLayout="dropdown"
        />
      </Card>
      <Card className="w-150 rounded-3xl p-6 ">
        <CardHeader>
          <CardTitle className="text-center text-3xl pb-4">
            Add a Memory
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

            <Button type="submit" className="w-full text-[#faf3e7] hover:bg-[#CB3038] hover:text-white">
              Publish
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}