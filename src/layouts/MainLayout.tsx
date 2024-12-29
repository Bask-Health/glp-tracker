import React, { useContext } from "react";
import { AppContext } from "@/context/app/AppContext";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { MainLoadingView } from "@/components/containers/main-loading-view/MainLoadingView";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      {isLoading ? <MainLoadingView /> : null}
      {!isLoading ? (
        <>
          <Header />
          <div className={"bg-neutral-100 px-6 md:px-24 lg:px-48 xl:px-96 py-5"}>{children}</div>
          <Footer />
        </>
      ) : null}
    </>
  );
};
