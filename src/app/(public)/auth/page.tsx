"use client";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Auth() {
  const [newUser, setNewUser] = useState(false);

  const params = useSearchParams();

  const emailConfirmed = params.get("email-confirmed");

  return (
    <div className="flex h-full">
      <div className="hidden md:flex w-1/2 bg-neutral-800 h-screen items-center justify-center">
        <h1 className="font-black text-6xl lg:text-8xl text-balance px-10 gradient-text">
          Welcome to, <span>Tracking My Workout</span>
        </h1>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center bg-neutral-950 p-5 rounded-md">
        <div className="flex flex-col gap-5 justify-center">
          {emailConfirmed && (
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 ">
              E-mail confirmed! You can now log in.
            </div>
          )}
          <Button
            variant="link"
            className="underline w-fit"
            onClick={() => {
              setNewUser(!newUser);
            }}
          >
            {newUser ? "Login" : "Register"}
          </Button>
          {newUser ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
}
