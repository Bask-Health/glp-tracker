import BaskLogo from "../../../assets/bask-logo.svg";
import { useSearchParams } from "react-router-dom";

export const MainLoadingView = () => {
  const [searchParams] = useSearchParams();
  const logoUrl = searchParams.get("logoUrl");
  return (
    <div className={"flex justify-center items-center h-svh"}>
      <div className={"flex flex-col items-center"}>
        <img
          className={"w-32 animate-logoSpin"}
          src={logoUrl ?? BaskLogo}
          alt="Brand Logo"
        />
        <p className={"text-xl font-light mt-4 animate-pulseFontWeight"}>
          Please wait till while we fetch your data
        </p>
      </div>
    </div>
  );
};
