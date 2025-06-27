"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Logout() {
  const router = useRouter();

  async function logoutUser(e) {
    e.preventDefault();

    try {
      const res = await axios.get(`/api/users/logout`);
      console.log(res);
      if (res.error) {
        return new Error(res.error);
      }
      toast.success("Logged out successfully");
      window.location.href = "/listings";
    } catch (err) {
      toast.success("error occurred");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1>Do your really want to log out</h1>
      <div className="flex flex-row justify-between">
        <Link
          className="text-xl text-theme-4 border-2 rounded-2xl p-2 hover:bg-theme-4 hover:text-theme-2 my-10"
          href="/users/profile"
        >
          cancel
        </Link>
        &nbsp; &nbsp; &nbsp;
        <button
          className="bg-red-500 hover:bg-red-700 p-2 my-10 rounded-xl text-xl"
          onClick={(e) => {
            logoutUser(e);
          }}
        >
          Logout
        </button>
        <Toaster />
      </div>
    </div>
  );
}
