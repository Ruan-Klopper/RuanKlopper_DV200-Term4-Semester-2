// app/components/Navbar/Navbar.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Notification from "../Notification/Notification";
import "./Navbar.css";
import "./hamburgerMenu.css";
import { Button } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";

const DesktopNav = ({ isLoggedIn, userProfile, username, cartAmount }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  return (
    <div>
      <div>
        <div className="DesktopNavContainer">
          <div className="dNavLogo"></div>

          <div className="dNavItems">
            {/* Cart button */}
            <Link
              href="/cart"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="NavLeftBtn">
                <div className="navCartIcon">
                  <div className="navStatusIcon">{cartAmount}</div>
                </div>
              </button>
            </Link>

            {/* Notification button */}
            <button className="NavLeftBtn" onClick={toggleNotification}>
              <div className="navBellIcon">
                <div className="navStatusIcon">9</div>
              </div>
            </button>

            {isLoggedIn ? (
              <Link
                href="/account"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="navUserProfile ml-5 mr-5">
                  <div
                    className="navUserProfileLeft mr-3"
                    style={{ backgroundImage: `url(${userProfile})` }}
                  ></div>
                  <div className="navUserProfileRight">
                    <h6 className="mb-1 mt-2 font-bold">Hi {username}</h6>
                    <h6 className="underline">Your account</h6>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="navLoginGroup ml-5 mr-5">
                <Button
                  variant="dark"
                  className="navLoginButton mr-1"
                  href="/signin"
                >
                  Sign in
                </Button>
                <Button
                  variant="dark"
                  className="navLoginButton"
                  href="/signup"
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="dNavLinks">
          <ul className="flex justify-center items-center">
            <li className="navitem">
              <Link href="/" style={{ textDecoration: "none", color: "black" }}>
                home
              </Link>
            </li>
            <li>
              <div className="navDot"></div>
            </li>
            <li className="navitem">
              <Link
                href="/products"
                style={{ textDecoration: "none", color: "black" }}
              >
                shop
              </Link>
            </li>
            <li>
              <div className="navDot"></div>
            </li>
            <li className="navitem">
              <Link
                href="/about"
                style={{ textDecoration: "none", color: "black" }}
              >
                about
              </Link>
            </li>
            {/* <li>
              <div className="navDot"></div>
            </li>
            <li className="navitem">
              <Link
                href="/skin-analysis"
                style={{ textDecoration: "none", color: "black" }}
              >
                .skin analysis
              </Link>
            </li> */}
            {/* <li>
              <div className="navDot"></div>
            </li>
            <li className="navitem">
              <Link
                href="/testimonials"
                style={{ textDecoration: "none", color: "black" }}
              >
                testimonials
              </Link>
            </li> */}
          </ul>
        </div>
      </div>

      {/* Desktop Notification Popup */}
      <div className={`dNotifyContainer ${isNotificationOpen ? "open" : ""}`}>
        {isNotificationOpen && <Notification onClose={closeNotification} />}
      </div>
    </div>
  );
};

const MobileNav = ({ isLoggedIn, userProfile, username, cartAmount }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Function to toggle the hamburger menu
  const toggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  // Function to toggle the notification popup
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) {
      setIsHamburgerOpen(false); // Collapse hamburger menu when notification opens
    }
  };

  // Close notification function
  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  return (
    <div>
      <div className="MobileNavContainer">
        <div className="mNavLogo"></div>

        <div className="mNavRight">
          {/* Cart button */}
          <Link
            href="/cart"
            style={{ textDecoration: "none", color: "black" }}
            className="m-2"
          >
            <button className="NavLeftBtn">
              <div className="navCartIcon">
                <div className="navStatusIcon">{cartAmount}</div>
              </div>
            </button>
          </Link>

          {/* Hamburger Menu Button */}
          <div className="hamburgerMenuBtn m-2" onClick={toggleHamburger}>
            {/* SVG for Hamburger */}
            <svg
              className={`ham hamRotate ham8 ${isHamburgerOpen ? "active" : ""}`}
              viewBox="0 0 100 100"
              width="80"
            >
              <path
                class="line top"
                d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
              />
              <path class="line middle" d="m 30,50 h 40" />
              <path
                class="line bottom"
                d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Hamburger Menu */}
      <div className={`mHamburgerMenu ${isHamburgerOpen ? "active" : ""}`}>
        <div className="mNavs">
          <ul className="mobileNavs">
            <li className="navitem mNavItem">
              <Link
                href="/"
                onClick={() => setIsHamburgerOpen(false)}
                style={{ textDecoration: "underline", color: "black" }}
              >
                home
              </Link>
            </li>
            <li className="navitem mNavItem">
              <Link
                href="/products"
                onClick={() => setIsHamburgerOpen(false)}
                style={{ textDecoration: "none", color: "black" }}
              >
                shop
              </Link>
            </li>
            <li className="navitem mNavItem">
              <Link
                href="/about"
                onClick={() => setIsHamburgerOpen(false)}
                style={{ textDecoration: "none", color: "black" }}
              >
                about
              </Link>
            </li>
            {/* <li className="navitem mNavItem">
              <Link
                href="/skin-analysis"
                onClick={() => setIsHamburgerOpen(false)}
                style={{ textDecoration: "none", color: "black" }}
              >
                .skin analysis
              </Link>
            </li> */}
            {/* <li className="navitem mNavItem">
              <Link
                href="/testimonials"
                onClick={() => setIsHamburgerOpen(false)}
                style={{ textDecoration: "none", color: "black" }}
              >
                testimonials
              </Link>
            </li> */}
          </ul>
        </div>

        <div className="mBottom m-3">
          {isLoggedIn ? (
            <Link
              href="/account"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="navUserProfile">
                <div
                  className="navUserProfileLeft mr-3"
                  style={{ backgroundImage: `url(${userProfile})` }}
                ></div>
                <div className="navUserProfileRight">
                  <h6 className="mb-1 mt-2 font-bold">Hi {username}</h6>
                  <h6 className="underline">Your account</h6>
                </div>
              </div>
            </Link>
          ) : (
            <div className="navLoginGroup mt-2.5">
              <Button
                variant="dark"
                className="navLoginButton mr-1"
                href="/signin"
              >
                Sign in
              </Button>
              <Button variant="dark" className="navLoginButton" href="/signup">
                Sign up
              </Button>
            </div>
          )}

          {/* Notification button */}
          <button className="NavLeftBtn" onClick={toggleNotification}>
            <div className="navBellIcon">
              <div className="navStatusIcon">9</div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Notification Popup */}
      <div className={`mNotifyContainer ${isNotificationOpen ? "open" : ""}`}>
        {isNotificationOpen && <Notification onClose={closeNotification} />}
      </div>
    </div>
  );
};

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState("/noAccount.jpg");

  const { cart } = useCart(); // Get cart from context
  const cartAmount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1150);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (session?.user?.image) {
      setUserProfile(session.user.image);
    }
  }, [session]);

  const isLoggedIn = !!session;
  const username = session?.user?.name || "Guest";

  // Cart amount is the amount of items there is on your cart, items must be fetched from the useCart hook, and must be updated in real time

  return (
    <div className="NavbarBody">
      {isMobile ? (
        <MobileNav
          isLoggedIn={isLoggedIn}
          userProfile={userProfile}
          username={username}
          cartAmount={cartAmount}
        />
      ) : (
        <DesktopNav
          isLoggedIn={isLoggedIn}
          userProfile={userProfile}
          username={username}
          cartAmount={cartAmount}
        />
      )}
    </div>
  );
}
