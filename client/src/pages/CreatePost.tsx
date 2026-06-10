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
    <div className="relative flex min-h-screen items-center justify-center bg-[#E6DECF] px-4">
      <h1>Skapa ditt inlägg</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <button type="submit">Publicera ditt inlägg</button>
      </form>
    </div>
  )
}