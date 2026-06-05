import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/images/hero-image.jpg";
import { motion } from "framer-motion";

export default function Header() {
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
          <SheetTrigger>
            <Button variant="ghost" className="text-[#E6DECF] hover:bg-[#E6DECF] hover:text-black">
              MENY
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="bg-[#E6DECF]">
            <nav className="mt-8 ml-4 mr-4 flex flex-col gap-5 text-xl">
              <a href="#" className="inline-block transition-transform duration-500 hover:scale-95">Dagens Bild</a>
              <img src="src/assets/images/line2.svg" alt="Line" className="" />
              <a href="#" className="inline-block transition-transform duration-500 hover:scale-95">Slumpa</a>
              <img src="src/assets/images/line2.svg" alt="Line" className="" />
              <a href="#" className="inline-block transition-transform duration-500 hover:scale-95">Bli Medlem</a>
              <img src="src/assets/images/line2.svg" alt="Line" className="" />
              <a href="#" className="inline-block transition-transform duration-500 hover:scale-95">Admin</a>
              <img src="src/assets/images/line2.svg" alt="Line" className="" />
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

// export default App;
