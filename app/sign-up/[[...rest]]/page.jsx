import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function page() {
  return (
    <div className="sign-in-box">
      <SignUp />
    </div>
  );
}
