"use client";

import BaskLogo from "@/assets/bask-logo.svg";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export const Header = () => {
  const searchParams = useSearchParams();
  const logoUrl = searchParams.get("logoUrl");
  return (
    <div className={"px-10 md:px-24 lg:px-24 xl:px-32 py-4 shadow-header bg-r-gray-100"}>
      <Image src={logoUrl ?? BaskLogo} className={"max-h-12"} alt={"Logo"} />
    </div>
  );
};
