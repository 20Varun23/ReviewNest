"use client";

import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const formRef = useRef(null);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
  });

  async function signUpUser(e) {
    e.preventDefault();

    try {
      console.log(user);

      const res = await axios.post(`/api/users`, user);
      if (res.error) {
        throw new Error("could not sign up user");
      }
      toast.success("user got added");
      router.push("/users/login");
    } catch (err) {
      toast.error("something went wrong there");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <br />
      <h1>Sign Up</h1>
      <br />
      <form className="flex flex-col items-center" ref={formRef}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="username" className="text-2xl">
                  username &nbsp;
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="username"
                  className="bg-white text-black p-2 rounded-xl peer border-4 w-xs focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                  }}
                  name="username"
                  required
                />
                <p className="invisible peer-invalid:visible text-pink-400">
                  Please provide a username.
                </p>
              </td>
            </tr>
            <p className="text-xs">&nbsp;</p>
            <tr>
              <td>
                <label htmlFor="email" className="text-2xl">
                  email &nbsp;
                </label>
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  className="bg-white text-black p-2 rounded-xl peer border-4 w-xs focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  name="email"
                  required
                />
                <p className="invisible peer-invalid:visible text-pink-400">
                  Please provide a email.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="age" className="text-2xl">
                  age &nbsp;
                </label>
              </td>
              <td>
                <input
                  type="number"
                  id="age"
                  className="bg-white text-black p-2 rounded-xl peer border-4 w-xs focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  onChange={(e) => {
                    setUser({ ...user, age: e.target.value });
                  }}
                  name="age"
                  required
                />
                <p className="invisible peer-invalid:visible text-pink-400">
                  Please provide a email.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <label htmlFor="password" className="text-2xl">
                  password&nbsp;
                </label>
              </td>
              <td>
                {" "}
                <input
                  type="password"
                  id="password"
                  className="bg-white text-black p-2 rounded-xl peer border-4 w-xs focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  name="title"
                  required
                />
                <p className="invisible peer-invalid:visible text-pink-400">
                  Please provide password.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="bg-sky-500 hover:bg-sky-700 p-3 m-7 rounded-xl"
          onClick={(e) => {
            signUpUser(e);
          }}
        >
          Sign Up
        </button>
        <Toaster />
      </form>
    </div>
  );
}
