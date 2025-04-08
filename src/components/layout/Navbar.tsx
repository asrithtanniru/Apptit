'use client'

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ThemeSwitcher from '../ThemeSwitcher';
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineFileSearch,
  AiOutlineDatabase,
  AiOutlineDollar,
  AiOutlineHeart,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineSetting,
} from 'react-icons/ai';
import { CiBookmark, CiBellOn } from "react-icons/ci";


export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  const homeRedirect = isLoggedIn ? '/jobs' : '/';

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8 py-3">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <AiOutlineMenu className="h-6 w-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/jobs" className="font-sans font-quicksand text-md">
                <AiOutlineFileSearch className="mr-2" />
                All Jobs
              </Link>
            </li>
            <li>
              <Link href="/sources" className="font-medium">
                <AiOutlineDatabase className="mr-2" />
                Job Sources
              </Link>
            </li>
            {isLoggedIn && (
              <>

                <li>
                  <Link href="/preferences">
                    Preferences
                  </Link>
                </li>
                <li>
                  <Link href="/profile">
                    <AiOutlineUser className="mr-2" />
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={() => signOut({ callbackUrl: '/' })}
                    className="font-medium">
                    <AiOutlineLogout className="mr-2" />
                    Logout
                  </button>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        <Link href={homeRedirect} className="flex items-center gap-2">
          <span className="text-primary text-3xl font-bold">Apptit</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/login" className="font-medium text-sm">
              All Jobs
            </Link>
          </li>
          <li>
            <Link href="/sources" className="font-medium text-sm">
              Job Sources
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link href="/saved-jobs" className="font-medium text-sm">
                  Saved Jobs

                </Link>
              </li>
              <li>
                <Link href="/preferences" className="font-medium text-sm">
                  Preferences
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <ThemeSwitcher />
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {session?.user?.image ? (
                  <img src={session?.user?.image} alt="User Avatar" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 rounded-full">
                    <AiOutlineUser className="h-6 w-6" />
                  </div>
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/profile" className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
                  <AiOutlineUser className="mr-2" />
                </Link>
              </li>
              <li>
                <Link href="/settings" className="justify-between">Settings
                  <AiOutlineSetting className="mr-2" />
                </Link>
              </li>
              <li>
                <button

                  onClick={async () => {
                    await signOut({ redirect: false })
                    window.location.href = '/'
                  }}
                  className="justify-between"
                >Logout
                  <AiOutlineLogout className="mr-2" />
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary btn-md">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
