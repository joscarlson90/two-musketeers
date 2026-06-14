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

interface Post {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: { _id: string; username: string };
  createdAt: string;
}

export default function App() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
              onSelect={setDate}
              locale={enUS}
              className="rounded-lg"
              captionLayout="dropdown"
            />
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              month={
                new Date(new Date().getFullYear(), new Date().getMonth() + 1)
              }
              locale={enUS}
              className="rounded-lg"
              captionLayout="dropdown"
            />
          </Card>

          <div className="flex-1">
            {loading ? (
              <p className="text-center">Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-center">No posts found</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {posts.map((post) => (
                  <motion.div
                    key={post._id}
                    initial={{ scale: 0.97 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                  >
                    <Card className="p-0 rounded-3xl bg-[#e6decfbc] shadow-2xl">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                          {post.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          by {post.author.username}
                        </p>
                      </CardHeader>

                      <CardContent>
                        {post.image && (
                          <img
                            src={`http://localhost:3000${post.image}`}
                            alt={post.title}
                            className="w-full h-64 rounded-2xl object-cover mb-4"
                          />
                        )}
                        <p className="p-2">{post.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
