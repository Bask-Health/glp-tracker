"use client";

import BaskLogo from "@/assets/bask-logo.svg";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export const MainLoadingView = () => {
  const searchParams = useSearchParams();
  const logoUrl = searchParams?.get("logoUrl");
  return (
    <div className={"flex justify-center items-center h-svh"}>
      <div className={"flex flex-col items-center"}>
        {logoUrl && <img src={logoUrl} className={"w-32 animate-logoSpin"} alt={"Logo"} />}
        {!logoUrl && <Image src={BaskLogo} className={" w-32 animate-logoSpin"} alt={"Logo"} />}
        <p className={"text-xl font-light mt-4 animate-pulseFontWeight"}>Please wait till while we fetch your data</p>
      </div>
    </div>
  );
};
