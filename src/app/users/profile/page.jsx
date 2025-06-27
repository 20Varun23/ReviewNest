"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getProfile() {
      const temp = await axios.get(`/api/users/profile`);
      console.log(temp);

      setUser(temp.data.user);
      console.log(user);
    }

    getProfile();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {!user ? (
        <p>Loading</p>
      ) : (
        <div>
          <h1>Profile</h1>

          <table className="text-left text-2xl" style={{ border: "white" }}>
            <tbody>
              <tr>
                <td className="p-2">Name</td>
                <td className="p-2">{user.username}</td>
              </tr>
              <tr>
                <td className="p-2">Email</td>
                <td className="p-2">{user.email}</td>
              </tr>
              <tr>
                <td className="p-2">Age</td>
                <td className="p-2">{user.age}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <Link
            className="text-xl text-theme-4 border-2 rounded-2xl p-2 hover:bg-theme-4 hover:text-theme-2 my-10"
            href="/users/logout"
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}

//[ ]: Add Logout functionallity
