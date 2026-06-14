import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const response = await fetch("/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                credentials: "include",
                body: JSON.stringify({
                    username,
                    password,
                }),
            }
        );

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            navigate("/");
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#faf3e7] px-4">
            <div className="absolute top-25 left-1/4 z-10 -translate-x-1/2 from-[#CB3038]">
                <img src="src/assets/images/star-vector.svg" alt="Decoration" className="absolut -top-10 -left-12 z-20 w-50 md:w-60 rotate-[-8deg]" />
                <p
                    className="absolute inset-0 flex items-center justify-center md:text-2xl"
                    style={{ fontFamily: "Gaegu" }}
                >

                </p>
            </div>
            <Card className="bg-[#F7F4EF] shadow-2xl border border-[#D8CDBA] w-full max-w-xl rounded-3xl">
                <CardHeader>
                    <CardTitle className="text-center text-4xl mb-8">
                        Welcome back!
                    </CardTitle>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <Input type="text" className="bg-white border-[#D8CDBA] focus-visible:ring-[#CB3038]" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input type="password" className="bg-white border-[#D8CDBA] focus-visible:ring-[#CB3038]" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit" className="bg-[#CB3038] text-white hover:bg-[#A8262D]">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}