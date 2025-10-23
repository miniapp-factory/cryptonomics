"use client";

import Link from "next/link";
import { Menu, Sun, Moon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { title } from "@/lib/metadata";
import { useState } from "react";

const pages = [
  {
    label: (
      <div className="flex place-items-center gap-2">
        <img
          className="size-[40px]"
          src="/icon.png"
          alt="icon"
          width={40}
          height={40}
        />
        <span className="text-xl">{title}</span>
      </div>
    ),
    href: "/",
  },
  { label: "Markets", href: "/markets" },
  { label: "Exchanges", href: "/exchanges" },
  { label: "News", href: "/news" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Watchlist", href: "/watchlist" },
];

export function Header() {
  const [isDark, setIsDark] = useState(
    typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : false
  );

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      <header className="sticky flex place-items-center gap-4 border-b p-4 max-md:hidden">
        {pages.map((page, i) => (
          <Link key={i} href={page.href}>
            {page.label}
          </Link>
        ))}
        <button
          onClick={toggleTheme}
          className="ml-auto rounded-full p-2 hover:bg-muted"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
      </header>
      <header className="sticky flex place-content-between border-b p-4 md:hidden">
        <Link href="/">{pages.find((page) => page.href === "/")?.label}</Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-muted"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          {pages.length > 1 && (
            <Drawer>
              <DrawerTrigger>
                <Menu />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="hidden">
                  <DrawerTitle>Navigation Menu</DrawerTitle>
                  <DrawerDescription>Navigate to other pages</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <div className="flex flex-col place-content-center gap-4">
                    {pages
                      .map((page) =>
                        page.href === "/"
                          ? {
                              ...page,
                              label: <span className="text-lg">Home</span>,
                            }
                          : page
                      )
                      .map((page, i) => (
                        <DrawerClose key={i}>
                          <Link href={page.href}>{page.label}</Link>
                        </DrawerClose>
                      ))}
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </header>
    </>
  );
}
