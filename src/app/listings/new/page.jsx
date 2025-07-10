"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function listingsNew({ params }) {
  const p = React.use(params);
  const formRef = useRef(null);

  const router = useRouter();

  const [newView, setNewView] = useState({
    title: "",
    description: "",
    image: {
      filename: "",
      url: "",
    },
    price: 0,
    location: "",
    country: "",
    owener: "",
  });
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    async function getOwenerId() {
      const res = await axios.get(`/api/users/profile`);

      console.log(res);

      if (!res.data.user) {
        router.push("/users/login");
      }

      const userId = res.data.user.id;

      console.log(userId);

      setOwner(userId);
    }

    getOwenerId();
  }, []);

  async function listingPost(e) {
    console.log("clicked");
    e.preventDefault();
    try {
      if (!formRef.current.checkValidity()) {
        formRef.current.reportValidity();
        return;
      }

      if (owner === null) {
        return new Error("could not identify user");
      }

      console.log(owner);

      const sendView = {
        title: newView.title,
        description: newView.description,
        filename: newView.image.filename,
        url: newView.image.url,
        price: newView.price,
        location: newView.location,
        country: newView.country,
        owner: owner,
      };

      await axios.post(`/api/listings/authReq`, sendView);
      router.push(`/listings`);
      toast.success("successfully add the listing");
    } catch (err) {
      console.log(err);
      toast.error("error while adding listing");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <br />
      <h1>Add listing</h1>
      <br />
      <form className="flex flex-col items-center" ref={formRef}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="title" className="text-2xl">
                  Title &nbsp;
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="title"
                  className="bg-white text-black p-2 rounded-xl peer border-4 focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  name="title"
                  value={newView.title}
                  onChange={(e) => {
                    setNewView({ ...newView, title: e.target.value });
                  }}
                  required
                />
                <p className="invisible peer-invalid:visible text-pink-400">
                  Please provide a valid title.
                </p>
              </td>
            </tr>
            <p className="text-xs">&nbsp;</p>
            <tr>
              <td>
                {" "}
                <label htmlFor="description" className="text-2xl">
                  Description &nbsp;
                </label>
              </td>
              <td>
                {" "}
                <textarea
                  type="text"
                  id="description"
                  className="bg-white text-black p-2 rounded-xl peer border-4 focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  name="description"
                  cols="50"
                  rows="2"
                  value={newView.description}
                  onChange={(e) => {
                    setNewView({
                      ...newView,
                      description: e.target.value,
                    });
                  }}
                  required
                ></textarea>
                <p className="invisible peer-invalid:visible text-pink-400">
                  Please provide a valid description.
                </p>
              </td>
            </tr>
            <p className="text-xs">&nbsp;</p>
            <tr>
              <td>
                {" "}
                <label htmlFor="filename" className="text-2xl">
                  Filename of thumbnail &nbsp;
                </label>
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  id="filename"
                  className="bg-white text-black p-2 rounded-xl peer border-4 focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  name="filename"
                  value={newView.image.filename}
                  onChange={(e) => {
                    setNewView({
                      ...newView,
                      image: {
                        ...newView.image,
                        filename: e.target.value,
                      },
                    });
                  }}
                />
                <p className="invisible peer-invalid:visible text-pink-400">
                  Please provide a valid filename.
                </p>
              </td>
            </tr>
            <p className="text-xs">&nbsp;</p>
            <tr>
              <td>
                {" "}
                <label htmlFor="title" className="text-2xl">
                  URL of thumbnail &nbsp;
                </label>
              </td>
              <td>
                {" "}
                <input
                  type="url"
                  id="url"
                  className="bg-white text-black p-2 rounded-xl peer border-4 focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  name="url"
                  value={newView.image.url}
                  onChange={(e) => {
                    setNewView({
                      ...newView,
                      image: {
                        ...newView.image,
                        url: e.target.value,
                      },
                    });
                  }}
                />
                <p className="invisible peer-invalid:visible text-pink-400">
                  Please provide a valid url.
                </p>
              </td>
            </tr>
            <p className="text-xs">&nbsp;</p>
            <tr>
              <td>
                {" "}
                <label htmlFor="price" className="text-2xl">
                  Price (per night in rupees) &nbsp;
                </label>
              </td>
              <td>
                {" "}
                <input
                  type="number"
                  id="price"
                  className="bg-white text-black p-2 rounded-xl peer border-4 focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  name="price"
                  value={newView.price}
                  onChange={(e) => {
                    setNewView({
                      ...newView,
                      price: e.target.value,
                    });
                  }}
                  min={1000}
                  required
                />
                <p className="invisible peer-invalid:visible text-pink-400">
                  Price should start from &#8377;1000.
                </p>
              </td>
            </tr>
            <p className="text-xs">&nbsp;</p>
            <tr>
              <td>
                {" "}
                <label htmlFor="location" className="text-2xl">
                  Location &nbsp;
                </label>
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  id="location"
                  className="bg-white text-black p-2 rounded-xl peer border-4 focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  name="location"
                  value={newView.location}
                  onChange={(e) => {
                    setNewView({
                      ...newView,
                      location: e.target.value,
                    });
                  }}
                  required
                />
                <p className="invisible peer-invalid:visible text-pink-400">
                  Please enter valid location
                </p>
              </td>
            </tr>
            <p className="text-xs">&nbsp;</p>
            <tr>
              <td>
                {" "}
                <label htmlFor="title" className="text-2xl">
                  Country &nbsp;
                </label>
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  id="country"
                  className="bg-white text-black p-2 rounded-xl peer border-4 focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  name="country"
                  value={newView.country}
                  onChange={(e) => {
                    setNewView({
                      ...newView,
                      country: e.target.value,
                    });
                  }}
                  required
                />
                <p className="invisible peer-invalid:visible text-pink-400">
                  Please enter valid country
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="bg-sky-500 hover:bg-sky-700 p-3 m-7 rounded-xl"
          onClick={listingPost}
        >
          Add listing
        </button>
        <Toaster />
      </form>
    </div>
  );
}
