import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { enUS } from "date-fns/locale";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const [inputImageName, setInputImageName] = useState("Add photo");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
    if (file) {
      setInputImageName(file.name);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (date) formData.append("postDate", date.toISOString());
    if (image) formData.append("image", image);

    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      navigate("/");
    }
  }

  return (
    <div className="bg-[#CB3038] min-h-screen flex flex-col items-center justify-center lg:flex-row gap-8">
      <Card className="h-fit items-center p-2 rounded-3xl w-full max-w-md lg:p-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={enUS}
          className="rounded-lg"
          captionLayout="dropdown"
        />
        <div className="hidden lg:block">

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={new Date(new Date().getFullYear(), new Date().getMonth() + 1)}
            locale={enUS}
            className="rounded-lg"
            captionLayout="dropdown"
          />
        </div>
      </Card>

      <Card className="w-full rounded-3xl max-w-2xl p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl pb-4 lg:text-3xl">
            Add a Memory
          </CardTitle>
        </CardHeader>
        <CardContent className="font-mono px-4 pb-8 lg:px-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              className="text-sm border border-slate-600"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              className="text-sm min-h-40 p-4 rounded-3xl border border-slate-600"
              placeholder="Description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="image-upload" className="block w-full rounded-3xl border border-black text-black text-center font-medium p-1.5 cursor-pointer hover:bg-[#CB3038] hover:text-white transition-colors">{inputImageName}</label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="bg-[#edeae3] hidden"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full object-contain rounded-2xl max-h-46 lg:max-h-60"
                />
              )}
            </div>
            <Button
              type="submit"
              className="w-full text-[#faf3e7] hover:bg-[#CB3038] hover:text-white"
            >
              Publish
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
