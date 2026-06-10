import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            navigate("/create-post");
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#E6DECF] px-4">
            <div className="absolute top-30 left-1/3 z-10 -translate-x-1/2 from-[#CB3038]">
                <img src="src/assets/images/star-vector.svg" alt="Decoration" className="absolut -top-10 -left-12 z-20 w-50 md:w-60 rotate-[-8deg]" />
                <p
                    className="absolute inset-0 flex items-center justify-center md:text-2xl"
                    style={{ fontFamily: "Gaegu" }}
                >

                </p>
            </div>

            <Card className="bg-[#F7F4EF] shadow-xl border border-black/5 w-full max-w-md rounded-3xl">
                <CardHeader>
                    <CardTitle className="text-center text-4xl mb-8">
                        LOGGA IN
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input type="text" className="p-2 border border-beige-300 rounded-md" placeholder="Användarnamn" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" className="p-2 border border-gray-300 rounded-md" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit" className="text-[#E6DECF] hover:bg-[#CB3038] hover:text-white">
                            Logga In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}