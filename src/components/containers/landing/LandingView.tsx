"use client";

import { ShareIframe } from "@/components/containers/landing/share-iframe/ShareIframe";
import { LandingMapAndReports } from "@/components/containers/landing/map-and-reports/LandingMapAndReports";
import { LandingReportSection } from "@/components/containers/landing/report-section/LandingReportSection";
import { LandingShortageSection } from "@/components/containers/landing/shortage-section/LandingShortageSection";
import { CheckCircle, Zap } from "lucide-react";

export const LandingPageView = () => {
  return (
    <>
      <div className={"min-h-svh"}>
        <ShareIframe />
        <p className={"font-semibold text-4xl text-center"}>GLP-1 Supply Tracker</p>
        <p
          className={
            "mt-5 text-center text-lg text-slate-600 leading-relaxed flex items-center justify-center gap-1 flex-wrap"
          }
        >
          Stay up-to-date on where GLP-1s are in
          <span className="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
            <Zap className="h-4 w-4 mr-1" />
            shortage
          </span>
          and where folks are having
          <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-1" />
            success
          </span>
          finding them
        </p>
        <LandingMapAndReports />
        <LandingReportSection />
        <LandingShortageSection />
      </div>
    </>
  );
};
