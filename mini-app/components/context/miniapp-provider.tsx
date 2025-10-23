"use client";

import { createContext, useContext, useEffect, useState } from "react";
import sdk, { Context } from "@farcaster/miniapp-sdk";
import { MiniAppSDK } from "@farcaster/miniapp-sdk/dist/types";

export interface MiniAppContext {
  sdk: MiniAppSDK;
  context: Context.MiniAppContext | undefined;
  isInMiniApp: boolean | undefined;
  user: User | null;
  watchlist: string[];
  theme: "light" | "dark";
  login: (user: User) => void;
  logout: () => void;
  addToWatchlist: (coinId: string) => void;
  removeFromWatchlist: (coinId: string) => void;
  toggleTheme: () => void;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

const defaultSettings: MiniAppContext = {
  sdk,
  context: undefined,
  isInMiniApp: undefined,
  user: null,
  watchlist: [],
  theme: "light",
  login: () => {},
  logout: () => {},
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  toggleTheme: () => {},
};

const MiniAppContext = createContext<MiniAppContext>(defaultSettings);

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  const [context, setContext] = useState<MiniAppContext>(defaultSettings);
  const [user, setUser] = useState<User | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">(
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const ready = async () => {
      await Promise.all([
        sdk.context
          .then((ctx) =>
            setContext((old) => ({
              ...old,
              context: ctx,
            }))
          )
          .catch(console.error),
        sdk
          .isInMiniApp()
          .then((isInMiniApp) =>
            setContext((old) => ({
              ...old,
              isInMiniApp,
            }))
          )
          .catch(console.error),
      ]);

      await sdk.actions.ready().catch(console.error);
    };

    ready();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addToWatchlist = (coinId: string) => {
    setWatchlist((prev) => [...new Set([...prev, coinId])]);
  };

  const removeFromWatchlist = (coinId: string) => {
    setWatchlist((prev) => prev.filter((id) => id !== coinId));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <MiniAppContext.Provider
      value={{
        ...context,
        user,
        watchlist,
        theme,
        login,
        logout,
        addToWatchlist,
        removeFromWatchlist,
        toggleTheme,
      }}
    >
      {children}
    </MiniAppContext.Provider>
  );
}

export function useMiniAppContext() {
  return useContext(MiniAppContext);
}
