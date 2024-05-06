import React from "react";
import Image from "next/image";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <>
      <div className="h-[1px] w-full bg-neutral-500">&nbsp;</div>
      <div className="bg-white px-8 py-4 flex flex-col items-center gap-8">
        <Image
          src="/funder_logo.png"
          alt="not found"
          width={0}
          height={0}
          unoptimized
          className="w-64 h-auto object-fill"
        />
        <div className="flex flex-col gap-2">
          <div className="flex justify-center gap-4">
            <Link href={"#"} className="text-[#555] text-[20px]">
              About us
            </Link>
            <Link href={"#"} className="text-[#555] text-[20px]">
              Places
            </Link>
            <Link href={"#"} className="text-[#555] text-[20px]">
              Events
            </Link>
          </div>
          <div className="flex justify-center gap-4">
            <Link href={"#"} className="text-[#555] text-[20px]">
              Sing Up
            </Link>
            <Link href={"#"} className="text-[#555] text-[20px]">
              Login
            </Link>
            <Link href={"#"} className="text-[#555] text-[20px]">
              Account
            </Link>
          </div>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-[32px] text-[#555]">
            <InstagramIcon fontSize="inherit" color="inherit" />
          </a>
          <a href="#" className="text-[32px] text-[#555]">
            <FacebookIcon fontSize="inherit" color="inherit" />
          </a>
          <a href="#" className="text-[32px] text-[#555]">
            <LinkedInIcon fontSize="inherit" color="inherit" />
          </a>
        </div>
        <p className="text-[#555] text-[18px]">
          Copyright © Funder 2024. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
