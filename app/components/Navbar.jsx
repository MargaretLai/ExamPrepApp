import React from "react";
import Link from "next/link";
import { SignedOut, UserButton, SignedIn } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          ExamMax
        </Link>
      </div>
      <SignedOut>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/sign-up">Sign Up</Link>
            </li>
            <li>
              <Link href="/sign-in">Sign In</Link>
            </li>
          </ul>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex-none flex items-center">
          <Link href="/quiz" className="btn btn-ghost">
            Quiz
          </Link>
          <Link href="/saved-lists" className="btn btn-ghost">
            Saved Flashcard Lists
          </Link>
          <UserButton className="ml-2" />
        </div>
      </SignedIn>
    </nav>
  );
}
