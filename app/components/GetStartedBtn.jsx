"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function GetStartedBtn() {
  const router = useRouter();

  function handleClick() {
    router.push("/sign-up");
  }

  return (
    <div>
      <SignedOut>
        <button className="btn btn-primary" onClick={handleClick}>
          Get Started
        </button>
      </SignedOut>
      <SignedIn>
        <Link href="/generate" className="btn btn-primary">Generate Flashcards</Link>
      </SignedIn>
    </div>
  );
}
