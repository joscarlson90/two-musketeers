import { Link } from "react-router-dom";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/images/hero-image.jpg";
import { motion } from "framer-motion";

export default function App() {
    return (
        <>
            <header className="flex items-center justify-between p-6 text-[#E6DECF] bg-[#CB3038]">
                <h1
                    className="text-5xl"
                    style={{ fontFamily: "Gaegu" }}
                >
                    Kamerarullen
                </h1>

                <Sheet>
                    <SheetTrigger className="text-[#E6DECF] hover:bg-[#E6DECF] hover:text-black hover:rounded-3xl px-4 py-2 duration-300">
                        MENY
                    </SheetTrigger>

                    <SheetContent side="right" className="bg-[#E6DECF]">
                        <nav className="mt-8 ml-4 mr-4 flex flex-col gap-5 text-xl">
                            <Link to="/daily-image" className="inline-block transition-transform duration-500 hover:scale-95">Dagens Bild
                                <p className="text-sm">Vår personliga favorit för dagen!</p></Link>
                            <img src="src/assets/images/line2.svg" alt="Line" className="" />
                            <Link to="/random-image" className="inline-block transition-transform duration-500 hover:scale-95">Slumpa
                                <p className="text-sm">Hitta en ny bild varje dag!</p>
                            </Link>
                            <img src="src/assets/images/line2.svg" alt="Line" className="" />
                            <Link to="/login-page" className="inline-block transition-transform duration-500 hover:scale-95">Logga In</Link>
                            <img src="src/assets/images/line2.svg" alt="Line" className="" />
                            <Link to="/register-page" className="inline-block transition-transform duration-500 hover:scale-95">Skapa Konto</Link>
                            <img src="src/assets/images/line2.svg" alt="Line" className="" />
                        </nav>
                        <nav className="mt-auto mr-4 mb-6 self-end">
                            <Link to="/admin-page" className="inline-block transition-transform duration-500 hover:scale-95">Admin</Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>

            <section className="h-screen">
                <img src={heroImage} alt="Hero Image" className="w-full h-auto object-cover" />
            </section>

            <motion.div
                initial={{ scale: 0.97 }}
                whileInView={{ scale: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
            >
                <section className="relative z-10 mx-auto max-w-4xl px-6">
                    <Card className="-mt-10 rounded-3xl bg-[#E6DECF] shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Dagens Bild</CardTitle>
                        </CardHeader>

                        <CardContent className="p-12">
                            <img
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF5JTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                                alt="Dagens bild"
                                className="w-auto rounded-lg"
                            />

                            <p className="mt-4">
                                En bild från vårt arkiv som vi vill lyfta fram idag.
                            </p>
                        </CardContent>
                    </Card >
                </section >
            </motion.div>
        </>
    );
}