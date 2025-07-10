import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { asyncWrap } from "../helpers/asyncWrap";
import { NextResponse } from "next/server";

export default function CommentCard({ el, user, pId }) {
  const [editMode, setEditMode] = useState(false);
  const [review, setReview] = useState({
    stars: el.stars,
    comment: el.comment,
    createdAt: el.createdAt,
    owner: el.owner,
  });

  console.log("commentCard here");

  async function deleteReview(e) {
    e.preventDefault();

    try {
      const res = await axios.delete(
        `/api/listings/${pId}/review/${e.target.id}`
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
      window.location.href = `/listings/${pId}`;
    } catch (err) {
      console.log(err);
      toast.error(`Something went wrong`);
    }
  }

  async function editReview(e) {
    console.log("clicked");
    e.preventDefault();

    try {
      console.log("here come");

      console.log(review);

      const res = await axios.patch(
        `/api/listings/${pId}/review/${el._id}`,
        review
      );
      if (res.error) {
        console.log(res.error);
        throw res.error;
      }

      toast.success(`review got updated`);
      window.location.href = `/listings/${pId}`;
    } catch (err) {
      console.log(err);
      toast.error("oops!! something went wrong");
    }
  }

  const d = new Date(el.createdAt);
  console.log(typeof d);
  return (
    <>
      {!editMode ? (
        <div className="bg-theme-5 m-2 rounded-2xl p-2 w-[90%] text-black font-bold  flex flex-row justify-between items-center">
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
              <div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-lg p-1.5 rounded-xl text-white font-medium m-3"
                  id={`${el._id}`}
                  onClick={(e) => {
                    console.log(e.target.id);
                    deleteReview(e);
                  }}
                >
                  delete
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-lg p-1.5 rounded-xl text-white font-medium"
                  id={`${el._id}`}
                  onClick={(e) => {
                    setEditMode(true);
                  }}
                >
                  edit
                </button>
              </div>
              <Toaster />
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <form className="flex flex-col m-2 items-center border-theme-3 border-2 p-1 rounded-2xl w-[80%]">
          <p className="text-2xl m-2">
            <u>Edit your review</u>
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
            value={review.comment}
            className="bg-white w-[80%] h-50 rounded-2xl p-2.5 text-black text-xl"
            onChange={(e) => {
              setReview({ ...review, comment: e.target.value });
            }}
          ></textarea>
          <div>
            <button
              className="py-2 px-4 bg-theme-4 hover:bg-theme-3 rounded-xl m-2"
              onClick={(e) => editReview(e)}
            >
              Edit
            </button>
            <button
              className="py-2 px-4 bg-theme-4 hover:bg-theme-3 rounded-xl m-2"
              onClick={(e) => setEditMode(false)}
            >
              cancel
            </button>
          </div>
          <Toaster />
        </form>
      )}
    </>
  );
}
