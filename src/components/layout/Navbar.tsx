// components/layout/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeSwitcher from '../ThemeSwitcher'


export default function Navbar() {
  const isLoggedIn = false; // In a real app, you would check auth state
  
  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8 py-3">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/jobs" className="font-sans font-quicksand textarea-md">All Jobs</Link></li>
            <li><Link href="/sources" className="font-medium">Job Sources</Link></li>
            <li><Link href="/pricing" className="font-medium">Pricing</Link></li>
            {isLoggedIn && (
              <>
                <li><Link href="/saved-jobs">Saved Jobs</Link></li>
                <li><Link href="/job-alerts">Job Alerts</Link></li>
                <li><Link href="/profile">Profile</Link></li>
              </>
            )}
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2">
          <span className="text-primary text-3xl font-bold">Apptit</span>
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/jobs" className="font-medium text-sm">All Jobs</Link></li>
          <li><Link href="/sources" className="font-medium text-sm">Job Sources</Link></li>
          <li><Link href="/pricing" className="font-medium text-sm">Pricing</Link></li>
          {isLoggedIn && (
            <>
              <li><Link href="/saved-jobs" className="font-medium text-sm">Saved Jobs</Link></li>
              <li><Link href="/job-alerts" className="font-medium text-sm">Job Alerts</Link></li>
            </>
          )}
        </ul>
      </div>
      
      <div className="navbar-end gap-2">
        <ThemeSwitcher />
        {isLoggedIn ? (
          <button className="btn btn-ghost btn-md ml-5 mb-1.5">Logout</button>
        ) : (
          <Link href="/login" className="btn btn-primary btn-md ml-5 mb-1.5">Login</Link>
        )}
      </div>
    </div>
  )
}