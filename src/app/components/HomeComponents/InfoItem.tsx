import React from "react";
import Image from "next/image";
import Link from "next/link";

const InfoItem = ({
  imagePath,
  buttonPath,
  textContent,
  buttonText,
}: {
  imagePath: string;
  buttonPath: string;
  textContent: string;
  buttonText: string;
}) => {
  return (
    <div className="grid grid-cols-2 place-items-center gap-x-10">
      <Image
        width={0}
        height={0}
        unoptimized
        alt="Not found"
        src={imagePath}
        className="w-full h-[70%] rounded-[7px] object-cover"
      />
      <div className="flex flex-col items-center gap-10">
        <p className="text-[#d893e9] text-[24px]">{textContent}</p>
        <Link
          href={buttonPath}
          className="bg-[#be4bdb] text-[#fff] px-8 py-2 text-[20px] rounded-[7px]"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default InfoItem;
