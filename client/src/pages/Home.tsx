import heroImage from "@/assets/images/hero-image.jpg";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { isSameDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: { _id: string; username: string } | string;
  createdAt: string;
  postDate: string;
  image?: string;
}

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

interface MockedPost {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
}

const mockedPosts: MockedPost[] = [
  {
    _id: "1",
    title: "Summer in Greece",
    content:
      "A beautiful evening by the sea with friends, great food, and a sunset we'll never forget.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    author: "Josefine",
  },
  {
    _id: "2",
    title: "First Snow",
    content:
      "The first snowfall of the year transformed the city into a winter wonderland overnight.",
    image:
      "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80",
    author: "Love",
  },
  {
    _id: "3",
    title: "Midsummer Celebration",
    content:
      "A day filled with laughter, dancing, strawberries, and memories shared with family.",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80",
    author: "Emma",
  },
  {
    _id: "4",
    title: "Mountain Adventure",
    content:
      "A long hike through breathtaking landscapes, ending with a spectacular view at sunset.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80",
    author: "Simon",
  },
  {
    _id: "5",
    title: "Grandma's Garden",
    content:
      "The scent of flowers, homemade pastries, and warm summer afternoons from childhood.",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80",
    author: "Maria",
  },
  {
    _id: "6",
    title: "Road Trip Across Sweden",
    content:
      "Thousands of kilometers, countless stops, and unforgettable moments along the way.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    author: "Sigge",
  },
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [dateSelected, setDateSelected] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [randomImage, setRandomImage] = useState(
    "https://plus.unsplash.com/premium_photo-1761928313247-03dd441591d6?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  );

  useEffect(() => {
    async function getUser() {
      const response = await fetch("/api/users/my-page", {});
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    }
    getPosts();
  }, []);

  useEffect(() => {
    async function getRandomDailyImage() {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=nature&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
      );
      if (response.ok) {
        const data = await response.json();
        setRandomImage(data.urls?.regular);
      }
    }
    getRandomDailyImage();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const today = new Date();
      const match = posts.find((p) => isSameDay(new Date(p.postDate), today));
      setDate(today);
      setDateSelected(match !== undefined);
      setSelectedPost(match ?? null);
    }
  }, [posts]);

  const navigate = useNavigate();

  async function handleLogout() {
    await fetch("/api/users/logout", { method: "POST" });
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
  }

  const handleDateSelect = (d: Date | undefined) => {
    setDate(d);
    if (!d) {
      setSelectedPost(null);
      setDateSelected(false);
      return;
    }
    setDateSelected(true);
    const match = posts.find((p) => isSameDay(new Date(p.postDate), d));
    setSelectedPost(match ?? null);
  };

  async function handleDeletePost(id: string) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setPosts((prev) => prev.filter((p) => p._id !== id));
      setSelectedPost(null);
      setDateSelected(false);
    }
  }

  const postDates = posts.map((post) => new Date(post.postDate));

  const renderCalendarCard = () => {
    if (selectedPost) {
      return (
        <Card className="p-0 rounded-3xl bg-[#faf3e7] shadow-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold p-4">
              {selectedPost.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full object-contain rounded-2xl mb-4"
              />
            )}
            <p className="p-2">{selectedPost.content}</p>
            <p className="p-2 text-sm italic">
              {typeof selectedPost.author === "object" &&
                selectedPost.author !== null
                ? (selectedPost.author as { _id: string; username: string })
                  .username
                : String(selectedPost.author)}{" "}
              — {new Date(selectedPost.createdAt).toLocaleString()}
            </p>
            {user &&
              typeof selectedPost.author === "object" &&
              selectedPost.author !== null &&
              selectedPost.author._id === user._id && (
                <Button
                  variant="destructive"
                  onClick={() => handleDeletePost(selectedPost._id)}
                >
                  Delete
                </Button>
              )}
          </CardContent>
        </Card>
      );
    }

    if (dateSelected) {
      return (
        <Card className="p-0 rounded-3xl bg-[#faf3e7] shadow-2xl">
          <CardContent className="p-8 text-center">
            <p className="text-xl text-gray-500">No posts for this date.</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="p-0 rounded-3xl bg-[#faf3e7] shadow-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold p-4">
            Our favorite today!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <img
            src={randomImage}
            alt="Dagens bild"
            className="w-full h-100 object-cover rounded-2xl"
          />
          <p className="p-2">
            An image from our archive that we want to highlight today.
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <header className="flex flex-col items-center lg:justify-between lg:flex-row p-6 gap-4 text-[#faf3e7] bg-[#CB3038]">
        <h1 className="lg:text-5xl text-3xl" style={{ fontFamily: "Gaegu" }}>
          MEMORY LANE
        </h1>

        <div className="flex flex-wrap justify-center items-center w-full gap-3 lg:absolute lg:w-auto lg:left-1/2 lg:-translate-x-1/2">
          {user ? (
            <>
              <p className="font-semibold">Hello {user.username}!</p>
              <Link to="/create-post">
                <Button>Create a new post</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login-page">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link to="/register-page">
                <Button>Become a member</Button>
              </Link>
            </>
          )}
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <div className="flex relative items-center gap-2">
            <div className="flex flex-wrap justify-center items-center gap-2 lg:justify-end">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  className="w-32 text-sm pl-10 sm:w-40 lg:w-50 bg-[#faf3e7] text-black"
                  placeholder="Username.."
                />
              </div>
              <SheetTrigger className="text-[#faf3e7] hover:bg-[#faf3e7] hover:text-black rounded-3xl px-4 py-2 duration-300">
                MENU
              </SheetTrigger>
            </div>
          </div>

          <SheetContent side="right" className="bg-[#faf3e7]">
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
            <nav className="flex align-center mt-auto mb-6 justify-evenly">
              {user && <Button onClick={handleLogout}>Log out</Button>}
              <Link
                to="/admin-page"
                className="flex items-center transition-transform duration-500 hover:scale-110"
              >
                Admin
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <div
        className="bg-cover bg-top"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="max-w-7xl mx-auto rounded-3xl p-6 lg:p-18">
          <section className="relative z-10 px-4 lg:px-10">
            <div className="mx-auto flex flex-col lg:flex-row gap-8">
              <Card className="rounded-3xl items-center shadow-2xl p-2 shrink-0 w-full lg:w-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => handleDateSelect(d)}
                  onMonthChange={setMonth}
                  modifiers={{ hasPost: postDates, }} modifiersClassNames={{ hasPost: "border-2 bg-[#CB3038] rounded-full text-white" }}
                  locale={enUS}
                  className="rounded-lg"
                  captionLayout="dropdown"
                />
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => handleDateSelect(d)}
                  month={new Date(month.getFullYear(), month.getMonth() + 1)}
                  locale={enUS}
                  className="rounded-lg hidden lg:block"
                  captionLayout="dropdown"
                />
              </Card>
              <motion.div
                className="w-full lg:max-w-4xl"
                initial={{ scale: 0.97 }}
                whileInView={{ scale: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
              >
                {renderCalendarCard()}
              </motion.div>
            </div>
          </section>
        </div>

        <section className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="text-center">
            <h2 className="text-4xl px-8 py-2 rounded-3xl inline-block bg-black font-bold mb-4 text-white">
              Latest Posts
            </h2>
          </div>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {mockedPosts.map((post) => (
                <CarouselItem
                  key={post._id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="h-112 rounded-3xl">
                      <CardContent className="flex flex-col h-full gap-4">
                        <span className="text-lg font-semibold">
                          {post.title}
                        </span>
                        <div className="flex-1">
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full object-cover h-60"
                          />
                        </div>
                        <p className="mt-auto text-sm font-medium">
                          {post.content}
                        </p>
                        <p className="mt-auto text-sm font-semibold italic">
                          {post.author}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:-left-12" />
            <CarouselNext className="right-2 md:-right-12" />
          </Carousel>
        </section>

        <footer className="w-full bg-[#CB3038] text-[#E6DECF] p-10 mt-20">
          <div className="flex flex-col items-center gap-2">
            <h4 className="font-semibold">Community</h4>
            <Link to="/register-page">Become a member</Link>
            <Link to="/login-page">Log In</Link>
          </div>
          <div className="mt-8 border-t border-[#faf3e7]/20 pt-6 text-center text-sm opacity-70">
            © 2026 Memory Lane • Josefine Carlson & Love Tampöld
          </div>
        </footer>
      </div>
    </>
  );
}
