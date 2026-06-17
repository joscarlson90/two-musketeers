import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";


export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log({ username, password })

        const response = await fetch("/api/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            setError(error);
            return;
        }

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            navigate("/login-page")
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#CB3038] px-4">
            <div className="absolute top-24 left-1/4 z-10 -translate-x-1/2 from-[#CB3038]">
                <img src="src/assets/images/star-vector.svg" alt="Decoration" style={{ animationDuration: "4s" }} className="animate-pulse -top-10 -left-12 z-20 w-55 md:w-66 rotate-[-10deg]" />
                <p
                    className="absolute inset-0 flex items-center justify-center md:text-2xl"
                    style={{ fontFamily: "Gaegu" }}
                >
                    <Link to="/register-page" className="text-xs">
                        Already a member?
                    </Link>
                </p>
            </div>

            <Card className="shadow-2xl border border-[#D8CDBA] w-full max-w-xl rounded-3xl">
                <CardHeader>
                    <CardTitle className="text-center text-3xl mb-8">
                        BECOME A MEMBER?
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col px-8 pb-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <Input type="text" className="bg-white border-[#D8CDBA] focus-visible:ring-[#CB3038]" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input type="password" className="bg-white border-[#D8CDBA] focus-visible:ring-[#CB3038]" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit" disabled={!username || !password} className="bg-[#CB3038] text-white hover:bg-[#A8262D]">
                            Create account
                        </Button>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}