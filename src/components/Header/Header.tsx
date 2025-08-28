"use client";
import { AuthContext } from "@/context/AuthContext";
import { Profiler, useContext } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import Link from "next/link";
import { CircleUser, Dumbbell, DumbbellIcon, LucideDumbbell, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLogout } from "@/hooks/useAuth";

export function Header() {
  const context = useContext(AuthContext);
  const pathname = usePathname();

  if (!context) {
    <div className="w-screen flex bg-red-400">DEU RUIM TODO</div>;
  }

  if (pathname === "/auth") {
    return null;
  }

  const logout = useLogout();

  if (context) {
    return (
      <div className="w-screen flex justify-between px-5 md:px-10 bg-zinc-900 py-5 mb-5">
        <Link href={"/"}>
          <Dumbbell fill="white" className="rotate-45" />
        </Link>
        <h1 className="text-xl font-black">Tracking My Workout</h1>
        <Popover>
          <PopoverTrigger className="cursor-pointer">
            {/* <h1>{context.user?.username}</h1>
             */}
            <CircleUser />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-5 items-center">
            <ul>
              <li>{context.user?.username}</li>
            </ul>
            <Button className="" type="button">
              <Link href={"/profile"}>
                <p>Profile</p>
              </Link>
            </Button>
            <Button className="" type="button" onClick={logout}>
              <p>Logout</p>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}
