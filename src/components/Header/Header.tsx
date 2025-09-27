"use client";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import Link from "next/link";
import { CircleUser, Dumbbell, LogOut, User, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useGetUser, useLogout } from "@/hooks/useAuth";

export function Header() {
  const context = useContext(AuthContext);
  const pathname = usePathname();
  const logout = useLogout();

  const user = useGetUser();

  if (pathname === "/auth" || !context || !user.data) {
    return null;
  }

  if (context && user.data) {
    console.log(user.data);
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <Link
              href="/"
              className="flex items-center gap-3 group transition-transform hover:scale-105"
            >
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                <Dumbbell className="h-6 w-6 text-white rotate-45" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Tracking My Workout
              </h1>
            </Link>

            {/* User Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative h-10 w-10 rounded-full border border-border/50 hover:border-border hover:bg-accent/50 transition-all duration-200"
                >
                  <CircleUser className="h-5 w-5 text-foreground/70" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-56 p-4"
                align="end"
                side="bottom"
                sideOffset={8}
              >
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {user.data.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Active User
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-10 px-3 hover:bg-accent/50"
                      asChild
                    >
                      <Link href="/profile">
                        <Settings className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-10 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
    );
  }
}
