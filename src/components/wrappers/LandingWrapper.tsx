"use client";

import { MainLoadingView } from "@/components/containers/main-loading-view/MainLoadingView";
import { Header } from "@/components/header/Header";
import { ReactNode, useContext } from "react";
import { AppContext } from "@/context/app/AppContext";

interface LandingWrapperProps {
  children: ReactNode;
}

export const LandingWrapper = ({ children }: LandingWrapperProps) => {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      {isLoading ? <MainLoadingView /> : null}
      {!isLoading ? (
        <>
          <Header />
          <div className={"bg-neutral-100 px-6 md:px-24 lg:px-48 xl:px-96 py-5 text-r-gray-100"}>{children}</div>
          {/*<Footer />*/}
        </>
      ) : null}
    </>
  );
};
