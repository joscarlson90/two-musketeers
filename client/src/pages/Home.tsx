import { Link } from "react-router-dom";
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/images/hero-image.jpg";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { enUS } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
}


export default function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    useEffect(() => {
        async function getPosts() {
            const response = await fetch("/api/posts");
            const data = await response.json();

            console.log("Posts:", data)
            setPosts(data);
        }
        getPosts();
    }, []);

    return (
        <>
            <header className="flex relative items-center lg:items-center lg:flex-row p-6 justify-between text-[#faf3e7] bg-[#CB3038]">
                <h1
                    className="lg:text-5xl text-3xl"
                    style={{ fontFamily: "Gaegu" }}
                >
                    MEMORY LANE
                </h1>

                <div className="absolute flex items-center left-1/2 -translate-x-1/2 gap-3">
                    <Link to="/login-page" className="transition-transform duration-500 hover:scale-95"><Button variant="ghost" className="hover:bg-[#faf3e7]">Log In</Button></Link>
                    <Link to="/register-page" className="transition-transform duration-500 hover:scale-95"><Button>Become a member</Button></Link>
                </div>

                <Sheet>
                    <div className="flex ml-auto items-center gap-2">
                        <Input type="search" className="w-52 bg-white text-black" placeholder="Username.." />
                        <SheetTrigger className="text-[#faf3e7] hover:bg-[#faf3e7] hover:text-black rounded-3xl px-4 py-2 duration-300">
                            MENU
                        </SheetTrigger>
                    </div>

                    <SheetContent side="right" className="bg-[#faf3e7]">
                        <nav className="mt-8 ml-4 mr-4 flex flex-col gap-5 text-xl">
                            <Link to="/daily-image" className="inline-block transition-transform duration-500 hover:scale-95">Picture of the day
                                <p className="text-sm">Our personal favorite of the day!</p></Link>
                            <img src="src/assets/images/line2.svg" alt="Line" />
                            <Link to="/random-image" className="inline-block transition-transform duration-500 hover:scale-95">Random
                                <p className="text-sm">Find a new favorite picture every day!</p>
                            </Link>
                            <img src="src/assets/images/line2.svg" alt="Line" />

                        </nav>
                        <nav className="mt-auto mr-4 mb-6 self-end">
                            <Link to="/admin-page" className="inline-block transition-transform duration-500 hover:scale-95">Admin</Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>

            <div className="min-h-[130vh] bg-cover bg-top" style={{ backgroundImage: `url(${heroImage})`, }}
            >
                <div className="max-w-7xl mx-auto rounded-3xl p-6 lg:p-18"
                    style={{
                        backgroundImage: `url()`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}>
                    <section className="relative z-10 px-4 lg:px-10 py-10">
                        <div className="mx-auto flex flex-col lg:flex-row items-center gap-8">
                            <Card className="rounded-3xl shadow-2xl p-4 shrink-0">
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
                            <motion.div
                                className="w-full lg:max-w-4xl"
                                initial={{ scale: 0.97 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ amount: 0.3 }}
                                transition={{ duration: 1.6, ease: "easeOut" }}
                            >
                                <Card className="p-0 rounded-3xl bg-[#faf3e7] shadow-2xl">
                                    <CardHeader>
                                        <CardTitle className="text-4xl font-bold p-2">Our favorite today!</CardTitle>
                                    </CardHeader>

                                    <CardContent className="pb-2 pr-2 pl-2">
                                        <img
                                            src="https://images.unsplash.com/photo-1781140435543-4e13447d9a0e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Dagens bild"
                                            className="w-full h-100 rounded-2xlg object-cover"
                                        />

                                        <p className="p-2">
                                            En bild från vårt arkiv som vi vill lyfta fram idag.
                                        </p>
                                    </CardContent>
                                </Card >
                            </motion.div>
                        </div>
                    </section>
                </div>
                <section className="max-w-7xl mx-auto px-4 lg:px-10 py-20">
                    <div className="text-center">
                        <h2 className="text-4xl px-8 py-2 rounded-3xl inline-block bg-black font-bold mb-2 text-[#faf3e7]">Latest Posts</h2>
                    </div>
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full max-w-3xl mx-auto"
                    >
                        <CarouselContent>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex flex-col h-full aspect-square p-6">
                                                <span className="text-lg font-semibold">{posts[0]?.title}
                                                </span>
                                                <div className="flex-1">BILD</div>
                                                <p className="mt-auto text-sm font-semibold">
                                                    {posts[0]?.content}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </section >
            </div >
        </>
    );
}