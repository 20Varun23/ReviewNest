"use client";

import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const router = useRef();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  async function loginUser(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/users/login`, login);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(`you are logged in!!`);
      window.location.href = "/listings";
    } catch (err) {
      console.log(err);
      toast.error("some error occured here");
    }
  }

  const formRef = useRef(null);
  return (
    <div className="flex flex-col items-center">
      <br />
      <h1>Login</h1>
      <br />
      <form className="flex flex-col items-center" ref={formRef}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="title" className="text-2xl">
                  email &nbsp;
                </label>
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  className="bg-white text-black p-2 rounded-xl peer border-4 w-xs focus:border-sky-300 invalid:border-pink-500 valid:border-green-400"
                  onChange={(e) => {
                    setLogin({ ...login, email: e.target.value });
                  }}
                  name="title"
                  required
                />
                <p className="invisible peer-invalid:visible text-pink-400">
                  Please provide a email.
                </p>
              </td>
            </tr>
            <p className="text-xs">&nbsp;</p>
            <tr>
              <td>
                {" "}
                <label htmlFor="description" className="text-2xl">
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
                    setLogin({ ...login, password: e.target.value });
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
            loginUser(e);
          }}
        >
          Add Login
        </button>
        <Toaster />
      </form>
    </div>
  );
}
