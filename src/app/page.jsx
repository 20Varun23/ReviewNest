"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function lsitings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function getListings() {
      try {
        const res = await axios.get("/api/listings");
        setListings(res.data.allListings);
      } catch (err) {
        console.log(err);
      }
    }
    getListings();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl my-4">ReviewNest</h1>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {listings.map((el) => {
          return (
            <div className="flex hover:opacity-80" key={el._id}>
              <a
                href={"/listings/" + el._id}
                style={{ textDecoration: "none" }}
              >
                <div className="flex flex-col bg-white w-100 rounded-2xl">
                  <img
                    src={el.image.url}
                    alt="Image not present"
                    className="h-100 rounded-t-2xl"
                  />
                  <div className="m-5">
                    <p className="text-black">{el.title}</p>
                    <p className="text-black">Price : Rs{el.price}/night</p>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
      <br />
      <br />
    </div>
  );
}
