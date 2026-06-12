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


export default function App() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <>
            <header className="relative flex items-center p-10 text-[#E6DECF] bg-[#CB3038]">
                <h1
                    className="text-5xl"
                    style={{ fontFamily: "Gaegu" }}
                >
                    MEMORY LANE
                </h1>

                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
                    <Link to="/login-page" className="transition-transform duration-500 hover:scale-95"><Button variant="ghost" className="hover:bg-[#E6DECF]">Log In</Button></Link>
                    <Link to="/register-page" className="transition-transform duration-500 hover:scale-95"><Button>Become a member</Button></Link>
                </div>

                <Sheet>
                    <div className="flex ml-auto items-center gap-2">
                        <Input type="search" className="w-52 bg-white text-black" placeholder="Username.." />
                        <SheetTrigger className="text-[#E6DECF] hover:bg-[#E6DECF] hover:text-black rounded-3xl px-4 py-2 duration-300">
                            MENU
                        </SheetTrigger>
                    </div>

                    <SheetContent side="right" className="bg-[#E6DECF]">
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

            <section className="relative h-[40vh]">
                <img src={heroImage} alt="Hero Image" className="w-full h-auto object-cover" />
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
                        className="w-175"
                        initial={{ scale: 0.97 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                    >
                        <Card className="p-0 rounded-3xl bg-[#e6decfbc] shadow-2xl">
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
            </section >
        </>
    );
}