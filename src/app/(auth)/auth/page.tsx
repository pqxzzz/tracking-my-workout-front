"use client";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Auth() {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className="basic-layout-mobile flex-col bg-gray-800 p-5 rounded-md">
      <div>
        <h1 className="text-2xl font-bold">Welcome</h1>
      </div>
      <div className="flex flex-col gap-5">
        <Button
          variant="link"
          className="underline"
          onClick={() => {
            setNewUser(!newUser);
          }}
        >
          {newUser ? "Login" : "Register"}
        </Button>
        {newUser ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
}
