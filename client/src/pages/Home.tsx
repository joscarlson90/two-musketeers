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


export default function App() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <>
            <header className="flex items-center justify-between p-10 text-[#E6DECF] bg-[#CB3038]">
                <h1
                    className="text-5xl"
                    style={{ fontFamily: "Gaegu" }}
                >
                    LOGO
                </h1>

                <div className="flex justify-center gap-6">
                    <Link to="/login-page" className="inline-block transition-transform duration-500 hover:scale-95"><Button variant="ghost">Log In</Button></Link>
                    {/* <img src="src/assets/images/line2.svg" alt="Line" /> */}
                    <Link to="/register-page" className="inline-block transition-transform duration-500 hover:scale-95"><Button>Become a member</Button></Link>
                    {/* <img src="src/assets/images/line2.svg" alt="Line" /> */}
                </div>
                <Sheet>
                    <SheetTrigger className="text-[#E6DECF] hover:bg-[#E6DECF] hover:text-black rounded-3xl px-4 py-2 duration-300">
                        MENY
                    </SheetTrigger>

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

            <section className="relative z-10 px-10 -mt-70">
                <div className="flex mx-auto lg:flex-row gap-8 items-start justify-between">

                    <Card className="rounded-3xl shadow-2xl">
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
                        className="w-100"
                        initial={{ scale: 0.97 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                    >
                        <Card className="p-0 rounded-3xl bg-[#e6decfbc] shadow-2xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold p-2">Our favorite today!</CardTitle>
                            </CardHeader>

                            <CardContent className="pb-2 pr-2 pl-2">
                                <img
                                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF5JTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                                    alt="Dagens bild"
                                    className="w-full rounded-lg"
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