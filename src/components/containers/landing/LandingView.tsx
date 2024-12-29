import { LandingReportSection } from "./report-section/LandingReportSection.tsx";
import { LandingShortageSection } from "./shortage-section/LandingShortageSection.tsx";
import { LandingMapAndReports } from "@/components/containers/landing/map-and-reports/LandingMapAndReports.tsx";
import { ShareIframe } from "@/components/containers/landing/share-iframe/ShareIframe.tsx";

export const LandingPageView = () => {
  return (
    <>
      <div className={"min-h-svh"}>
        <ShareIframe />
        <p className={"font-semibold text-4xl"}>GLP-1 Supply Tracker</p>
        <p className={"mt-5"}>
          Stay up-to-date on where GLP-1s are in shortage ⚡ and where folks are
          having success finding them 🙌
        </p>
        <LandingMapAndReports />
        <LandingReportSection />
        <LandingShortageSection />
      </div>
    </>
  );
};
