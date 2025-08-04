"use client";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function Header() {
  const context = useContext(AuthContext);

  if (!context) {
    <div className="w-screen flex bg-red-400">DEU RUIM TODO</div>;
  }

  if (context) {
    return (
      <div className="w-screen flex justify-between px-5 md:px-10 bg-gray-800 py-5 mb-5">
        <h1>LOGO</h1>
        <h1>Menu</h1>
        <Popover>
          <PopoverTrigger>
            <h1>{context.user?.username}</h1>
          </PopoverTrigger>
          <PopoverContent>
            <ul>
              <li>{context.user?.email}</li>
              <li>{context.user?.height ? context.user?.height / 100 : "X"} m</li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}
