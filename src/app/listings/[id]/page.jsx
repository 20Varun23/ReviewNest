"use client";

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import CommentCard from "@/app/components/commentCard";

export default function viewListing({ params }) {
  const p = React.use(params);

  const [view, setView] = useState(null);
  const [user, setUser] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [logged, setLogged] = useState(false);
  const [review, setReview] = useState({
    stars: 1,
    comment: "",
    createdAt: Date.now(),
    owner: null,
  });

  useEffect(() => {
    async function getListingView() {
      try {
        const res = await axios.get(`/api/listings/${p.id}`);
        console.log("res" + res);

        console.log(res);
        if (res.error) {
          throw res.error;
        }
        const tempView = res.data.listing;
        setView(tempView);
        const resp = await axios.get(`/api/users/profile`);
        console.log(resp.data.logged);

        setLogged(resp.data.logged);

        const userId = resp.data.user.id;

        console.log(userId);
        console.log(tempView.owner);

        if (userId && userId == tempView.owner) {
          setIsOwner(true);
        }
        //console.log(userId);
        setUser(userId);
        setReview({ ...review, owner: user });
        console.log(logged);

        console.log(user);
      } catch (err) {
        console.log(err);
      }
    }

    if (p.id) {
      getListingView();
    }
  }, [p.id, user, logged]);

  async function postReview(e) {
    e.preventDefault();

    try {
      console.log(user);

      const res = await axios.post(`/api/listings/${p.id}/review`, review);
      if (res.error) {
        console.log(res.error);
        throw res.error;
      }

      toast.success(`review got added`);
      window.location.href = `/listings/${p.id}`;
    } catch (err) {
      console.log(err);
      toast.error(`some error occurred`);
    }
  }

  return (
    <>
      {view && (
        <div className="flex flex-col items-center">
          <br />
          <h1>{view.title}</h1>
          <br />
          <div className="flex flex-col">
            <img
              src={view.image.url}
              alt="No image here"
              className="rounded-2xl"
            />
            <br />
            <h3>Country : {view.country}</h3>
            <h4>Location : {view.location}</h4>
            <p>Price : &#8377;{view.price}</p>
          </div>
          <div className="m-5">
            <br />
            <a
              href="/listings"
              className="bg-sky-500 hover:bg-sky-700 p-3 m-7 rounded-xl"
            >
              Go back
            </a>
            {isOwner ? (
              <>
                <a
                  href={`/listings/delete/${view._id}`}
                  className="bg-red-500 hover:bg-red-700 p-3 m-7 rounded-xl"
                >
                  Delete listing
                </a>
                &nbsp;
                <a
                  href={`/listings/edit/${view._id}`}
                  className="bg-green-500 hover:bg-green-700 p-3 m-7 rounded-xl"
                >
                  Edit listing
                </a>
              </>
            ) : (
              ""
            )}
          </div>
          &nbsp;
          <br />
          <div className="flex flex-col justify-center bg-theme-2 w-[75vw] items-center rounded-xl p-3">
            <h4 className="text-3xl">Reviews</h4>
            <div className="flex flex-row flex-wrap w-[100%] justify-center">
              {view.reviews.length === 0 ? (
                logged ? (
                  <p className="text-2xl">
                    No reviews...Be the first to leave a review
                  </p>
                ) : (
                  <p className="text-2xl">Please log in to leave a review</p>
                )
              ) : (
                view.reviews.map((el) => {
                  return (
                    <CommentCard
                      el={el}
                      user={user}
                      pId={p.id}
                      key={el._id}
                    ></CommentCard>
                  );
                })
              )}
            </div>
            <hr className="bg-amber-50 text-white" />
            {console.log(logged)}
            {logged ? (
              <form className="flex flex-col m-2 items-center border-theme-3 border-2 p-1 rounded-2xl w-[80%]">
                <p className="text-2xl m-2">
                  <u>Add a review</u>
                </p>
                <p className="text-xl">rating</p>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  className="w-[50%] m-2"
                  value={review.stars}
                  onChange={(e) => {
                    setReview({ ...review, stars: e.target.value });
                  }}
                />
                <textarea
                  className="bg-white w-[80%] h-50 rounded-2xl p-2.5 text-black text-xl"
                  onChange={(e) => {
                    setReview({ ...review, comment: e.target.value });
                  }}
                ></textarea>
                <button
                  className="py-2 px-4 bg-theme-4  hover:bg-theme-3 rounded-xl m-2"
                  onClick={(e) => postReview(e)}
                >
                  Add
                </button>
                <Toaster />
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}
