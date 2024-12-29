"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import BaskLogo from "@/assets/bask-logo.svg";

export const Header = () => {
  const searchParams = useSearchParams();
  const logoUrl = searchParams?.get("logoUrl");
  return (
    <div className={"px-10 md:px-24 lg:px-24 xl:px-32 py-4 shadow-header bg-r-gray-100"}>
      {logoUrl && <img src={logoUrl} className={"max-h-12"} alt={"Logo"} />}
      {!logoUrl && <Image src={BaskLogo} className={"max-h-12"} alt={"Logo"} />}
    </div>
  );
};
