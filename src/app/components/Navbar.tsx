"use client";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import InfoIcon from "@mui/icons-material/Info";
import WineBarIcon from "@mui/icons-material/WineBar";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axios from "axios";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="w-full p-8 bg-white flex-col flex gap-12">
      <div className="flex justify-between items-end">
        <Link href={"/"} className="w-[10%]">
          <Image
            width={0}
            height={0}
            alt="Funder logo"
            src="/funder_logo.png"
            className="w-full h-auto"
            unoptimized
          />
        </Link>
        <div className="flex gap-4">
          {user ? (
            <Link href={"#"} className="text-[#555]">
              {user}
            </Link>
          ) : (
            <>
              <Link
                href={"/login"}
                className="text-[#be4bdb] text-[20px] px-4 py-2 border-solid border-2 border-[#be4bdb] rounded-[5px]"
              >
                Log in
              </Link>
              <Link
                href={"/singup"}
                className="bg-[#be4bdb] text-[#fff] text-[20px] px-4 py-2 rounded-[5px]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      <ul className="flex justify-around list-none">
        <li>
          <Link
            href={"/"}
            className="text-[#555] flex items-start text-[20px] gap-2"
          >
            <InfoIcon color="inherit" fontSize="inherit" />
            <span>About us</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/places"}
            className="text-[#555] flex items-start text-[20px] gap-2"
          >
            <WineBarIcon color="inherit" fontSize="inherit" />
            <span>Places</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/events"}
            className="text-[#555] flex items-start text-[20px] gap-2"
          >
            <AutoAwesomeIcon color="inherit" fontSize="inherit" />
            <span>Events</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
