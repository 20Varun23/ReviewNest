"use client";

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function viewListing({ params }) {
  const router = useRouter();
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
        const resp = await axios.get(`/api/users/isOwener`);
        console.log(resp.data.userLogged);

        if (resp.data.userLogged != null && !resp.data.userLogged) {
          console.log("reached here");
          return;
        } else {
          console.log("hello");
          setLogged(true);
        }

        const userId = resp.data.userId;

        console.log(userId);

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
      toast.error(`some error occurred`);
    }
  }

  //TODO: edit reviews

  async function deleteReview(e) {
    e.preventDefault();

    try {
      const res = await axios.delete(
        `/api/listings/${p.id}/review/${e.target.id}`
      );
      if (res.error) {
        console.log(res.error);
        throw res.error;
      }

      console.log(res);
      if (res.error) {
        console.log(res.error);
        throw res.error;
      }
      toast.success(`review got deleted`);
    } catch (err) {
      console.log(err);
      toast.error(`Something went wrong`);
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
              {
                // TODO: add stars over here

                view.reviews.length === 0 ? (
                  logged ? (
                    <p className="text-2xl">
                      No reviews...Be the first to leave a review
                    </p>
                  ) : (
                    <p className="text-2xl">Please log in to leave a review</p>
                  )
                ) : (
                  view.reviews.map((el) => {
                    const d = new Date(el.createdAt);
                    console.log(typeof d);
                    return (
                      <div
                        key={el._id}
                        className="bg-theme-5 m-2 rounded-2xl p-2 w-[90%] text-black font-bold  flex flex-row justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <p className="text-xl">{d.toDateString()}</p>
                          <div className="flex flex-row justify-between">
                            <p className="text-lh">rating : {el.stars}/5</p>
                          </div>
                          <p className="text-lg font-normal">{el.comment}</p>
                        </div>
                        {console.log(user)}
                        {console.log(el.owner)}
                        {user == el.owner ? (
                          <>
                            <button
                              className="bg-red-500 text-lg p-1.5 rounded-xl text-white font-medium"
                              id={`${el._id}`}
                              onClick={(e) => {
                                console.log(e.target.id);
                                deleteReview(e);
                              }}
                            >
                              delete
                            </button>
                            <Toaster />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })
                )
              }
            </div>
            <hr className="bg-amber-50 text-white" />
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
                  className="py-2 px-4 bg-theme-4 rounded-xl m-2"
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
