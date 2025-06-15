"use client";

import { usePathname } from "next/navigation";
import { HeaderLink } from "./HeaderLink";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600">AOJ/AtCoder-JOI</h1>
            <div className="flex items-center space-x-4">
                <nav className="flex space-x-2">
                    <HeaderLink href="/" isActive={pathname === "/"}>List</HeaderLink>
                    <HeaderLink href="/history" isActive={pathname === "/history"}>History</HeaderLink>
                    <HeaderLink href="/about" isActive={pathname === "/about"}>About</HeaderLink>
                </nav>
                <ThemeToggle />
            </div>
        </div>
    </header>
  );
};