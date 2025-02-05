"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";
import { Button } from "../common";

const Header = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropDownOpen] = useState(false);

  return (
    <header className="h-16 px-8 py-8 flex items-center justify-end">
      {session ? (
        <div className="hidden lg:block relative">
          <Button
            onClick={() => setDropDownOpen(!dropdownOpen)}
            className="h-10 w-10 p-0 rounded-full bg-black-100/5 dark:bg-white-500/5 hover:bg-black-100/10 dark:hover:bg-white-500/10"
          >
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name}
                className="rounded-full h-8 w-8"
              />
            ) : (
              <User className="h-8 w-8 text-black-300 dark:text-white-700" />
            )}
          </Button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white dark:bg-dark-primary shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <div className="px-4 py-2 border-b border-black-300/10 dark:border-white-500/10">
                  <p className="font-medium text-black-300 dark:text-white-700">
                    {session.user.name || session.user.email}
                  </p>
                </div>

                <Link
                  href="/account/settings"
                  onClick={() => setDropDownOpen(false)}
                >
                  <div className="px-4 py-2 hover:bg-black-100/10 dark:hover:bg-white-500/10">
                    <Settings className="inline-block mr-2 h-4 w-4" />
                    Settings
                  </div>
                </Link>

                <button
                  onClick={() => {
                    setDropDownOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-black-100/10 dark:hover:bg-white-500/10"
                >
                  <LogOut className="inline-block mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2.5">
          <Link href="/auth/signin">
            <Button
              variant="custom"
              className="mt-2 font-sf-light bg-dark-primary/90 hover:bg-dark-secondary/90  dark:bg-light-primary dark:hover:bg-light-secondary text-white dark:text-black-200  transition-all duration-300 rounded-xl "
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button
              variant="custom"
              className="mt-2 font-sf-light bg-light-secondary/100 hover:bg-light-secondary/60 text-dark-primary   dark:bg-dark-secondary/100 dark:hover:bg-dark-secondary/80  dark:text-light-primary   transition-all duration-300 rounded-xl"
            >
              Signup
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
