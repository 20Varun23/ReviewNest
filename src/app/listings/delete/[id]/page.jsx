"use client";

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function deleteView({ params }) {
  const router = useRouter();
  const p = React.use(params);

  async function listingDelete(e) {
    e.preventDefault();
    console.log(`button clicked`);
    try {
      await axios.delete(`/api/listings/${p.id}`);
      router.push(`/listings`);
      toast.success("listings got deleted");
    } catch (err) {
      toast.error("had error here");
      console.log(err);
    }
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl">
        Are you sure your want to delete this listing
      </h1>
      <form action="" className="flex flex-row ">
        <button
          className="bg-red-500 hover:bg-red-700 p-3 m-7 rounded-xl"
          onClick={listingDelete}
        >
          Delete listing
        </button>
        <Toaster />

        <a
          href={`/listings/${p.id}`}
          className="bg-blue-500 hover:bg-blue-700 p-3 m-7 rounded-xl"
        >
          Go back
        </a>
      </form>
    </div>
  );
}
