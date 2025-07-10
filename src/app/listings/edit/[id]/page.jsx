"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function editListing({ params }) {
  const router = useRouter();
  const formRef = useRef(null);

  const p = React.use(params);

  const [editView, setEditView] = useState(null);

  useEffect(() => {
    async function getEditView() {
      const res = await axios.get(`/api/listings/${p.id}`);

      const tempEdit = res.data.listing;
      const userResp = await axios.get(`/api/users/profile`);

      if (!userResp.data.id || userResp.data.id != tempEdit.owner) {
        router.push(`/listings/${p.id}`);
      } else {
        setEditView(tempEdit);
        console.log("correct user");
      }
    }

    if (p.id) {
      getEditView();
    }
  }, [p.id]);

  async function listingPatch(e) {
    console.log("clicked");

    e.preventDefault();

    if (!formRef.current.checkValidity()) {
      toast.error("please check the fields you have given input");
      return;
    }

    const sendView = {
      title: editView.title,
      description: editView.description,
      filename: editView.image.filename,
      url: editView.image.url,
      price: editView.price,
      location: editView.location,
      country: editView.country,
    };

    try {
      console.log("hello");

      await axios.patch(`/api/listings/${p.id}/authReq`, { ...sendView });
      router.push(`/listings/${p.id}`);
      toast.success("The listing goit updated");
    } catch (err) {
      console.log(err);
      toast.error("Some error occured... check if all fields were added");
    }
  }

  return (
    <>
      {editView && (
        <div className="flex flex-col items-center">
          <br />
          <h1>Edit listing</h1>
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
                      value={editView.title}
                      onChange={(e) => {
                        setEditView({ ...editView, title: e.target.value });
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
                      value={editView.description}
                      onChange={(e) => {
                        setEditView({
                          ...editView,
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
                      value={editView.image.filename}
                      onChange={(e) => {
                        setEditView({
                          ...editView,
                          image: {
                            ...editView.image,
                            filename: e.target.value,
                          },
                        });
                      }}
                    />{" "}
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
                      value={editView.image.url}
                      onChange={(e) => {
                        setEditView({
                          ...editView,
                          image: {
                            ...editView.image,
                            url: e.target.value,
                          },
                        });
                      }}
                    />{" "}
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
                      value={editView.price}
                      onChange={(e) => {
                        setEditView({
                          ...editView,
                          price: e.target.value,
                        });
                      }}
                      min={1000}
                      required
                    />
                    <p className="invisible peer-invalid:visible text-pink-400">
                      Please provide a valid price.
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
                      value={editView.location}
                      onChange={(e) => {
                        setEditView({
                          ...editView,
                          location: e.target.value,
                        });
                      }}
                      required
                    />{" "}
                    <p className="invisible peer-invalid:visible text-pink-400">
                      Please provide a valid location.
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
                      value={editView.country}
                      onChange={(e) => {
                        setEditView({
                          ...editView,
                          country: e.target.value,
                        });
                      }}
                      required
                    />
                    <p className="invisible peer-invalid:visible text-pink-400">
                      Please provide a valid country.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 p-3 m-7 rounded-xl"
                onClick={listingPatch}
              >
                Edit listing
              </button>
              <Toaster />
              <a
                href={`/listings/${p.id}`}
                className="bg-blue-500 hover:bg-blue-700 p-4 m-7 rounded-xl"
              >
                Go back
              </a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
