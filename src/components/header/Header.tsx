"use client";

import { useSearchParams } from "next/navigation";

export const Header = () => {
  const searchParams = useSearchParams();
  const logoUrl = searchParams?.get("logoUrl");
  return (
    logoUrl && (
      <div className={"px-10 md:px-24 lg:px-24 xl:px-32 py-4 shadow-header bg-r-gray-100"}>
        <img src={logoUrl} className={"max-h-12"} alt={"Logo"} />
      </div>
    )
  );
};
