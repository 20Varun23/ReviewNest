import { cookies } from "next/headers";
import Link from "next/link";

export default async function Navbar() {
  const cookieStore = await cookies();

  const user = cookieStore.get("token");

  return (
    <div className="text-xs flex flex-row justify-between items-center p-3 bg-theme-2">
      {/* left */}
      <Link
        href="/listings"
        className="justify-self-start text-3xl limelight-regular"
      >
        ReviewNest
      </Link>
      {user ? (
        <>
          {/* right */}
          <div className="flex flex-row justify-between">
            <Link
              href="/listings/new"
              className="justify-self-end text-base text-theme-4 border-2 rounded-2xl p-1.5 hover:bg-theme-4 hover:text-theme-2 mx-2"
            >
              Add Listing
            </Link>
            <Link
              className="justify-self-end text-base text-theme-4 border-2 rounded-2xl p-1.5 hover:bg-theme-4 hover:text-theme-2 mx-2"
              href="users/profile"
            >
              Profile
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-between">
          <Link
            className="justify-self-end text-base text-theme-4 border-2 rounded-2xl p-1.5 hover:bg-theme-4 hover:text-theme-2 mx-2"
            href="/users/login"
          >
            Login
          </Link>
          <Link
            className="justify-self-end text-base text-theme-4 border-2 rounded-2xl p-1.5 hover:bg-theme-4 hover:text-theme-2 mx-2"
            href="/users/signUp"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
