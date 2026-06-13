import heroImage from "@/assets/images/hero-image.jpg";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import * as React from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [posts, setPosts] = React.useState<any[]>([]);
  const [selectedPost, setSelectedPost] = React.useState<any | null>(null);

  React.useEffect(() => {
    async function load() {
      const res = await fetch("/api/posts", { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      setPosts(data);
    }
    load();
  }, []);

  const isSameDay = (a?: string | Date, b?: Date) => {
    if (!a || !b) return false;
    const d1 = new Date(a);
    return (
      d1.getFullYear() === b.getFullYear() &&
      d1.getMonth() === b.getMonth() &&
      d1.getDate() === b.getDate()
    );
  };

  const handleDateSelect = (d: Date | undefined) => {
    setDate(d);
    if (!d) {
      setSelectedPost(null);
      return;
    }
    const match = posts.find((p) => isSameDay(p.createdAt, d));
    setSelectedPost(match ?? null);
  };

  return (
    <>
      <header className="relative flex items-center p-10 text-[#E6DECF] bg-[#CB3038]">
        <h1 className="text-5xl" style={{ fontFamily: "Gaegu" }}>
          MEMORY LANE
        </h1>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
          <Link
            to="/login-page"
            className="transition-transform duration-500 hover:scale-95"
          >
            <Button variant="ghost" className="hover:bg-[#E6DECF]">
              Log In
            </Button>
          </Link>
          <Link
            to="/register-page"
            className="transition-transform duration-500 hover:scale-95"
          >
            <Button>Become a member</Button>
          </Link>
        </div>

        <Sheet>
          <div className="flex ml-auto items-center gap-2">
            <Input
              type="search"
              className="w-52 bg-white text-black"
              placeholder="Username.."
            />
            <SheetTrigger className="text-[#E6DECF] hover:bg-[#E6DECF] hover:text-black rounded-3xl px-4 py-2 duration-300">
              MENU
            </SheetTrigger>
          </div>

          <SheetContent side="right" className="bg-[#E6DECF]">
            <nav className="mt-8 ml-4 mr-4 flex flex-col gap-5 text-xl">
              <Link
                to="/daily-image"
                className="inline-block transition-transform duration-500 hover:scale-95"
              >
                Picture of the day
                <p className="text-sm">Our personal favorite of the day!</p>
              </Link>
              <img src="src/assets/images/line2.svg" alt="Line" />
              <Link
                to="/random-image"
                className="inline-block transition-transform duration-500 hover:scale-95"
              >
                Random
                <p className="text-sm">
                  Find a new favorite picture every day!
                </p>
              </Link>
              <img src="src/assets/images/line2.svg" alt="Line" />
            </nav>
            <nav className="mt-auto mr-4 mb-6 self-end">
              <Link
                to="/admin-page"
                className="inline-block transition-transform duration-500 hover:scale-95"
              >
                Admin
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <section className="relative h-[40vh]">
        <img
          src={heroImage}
          alt="Hero Image"
          className="w-full h-auto object-cover"
        />
      </section>

      <section className="relative z-10 px-10 -mt-65">
        <div className="mx-auto flex max-w-7xl items-start justify-center gap-30">
          <Card className="rounded-3xl shadow-2xl p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => handleDateSelect(d)}
              locale={enUS}
              className="rounded-lg"
              captionLayout="dropdown"
            />
          </Card>
          <motion.div
            className="w-175"
            initial={{ scale: 0.97 }}
            whileInView={{ scale: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          >
            <div className="mt-6 mx-auto max-w-3xl">
              {selectedPost ? (
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>{selectedPost.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedPost.content}</p>
                    <p className="text-sm text-muted">
                      {selectedPost.author?.username || selectedPost.author} —{" "}
                      {new Date(selectedPost.createdAt).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <p className="text-center bg-gray-500">
                  No post for that date.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
