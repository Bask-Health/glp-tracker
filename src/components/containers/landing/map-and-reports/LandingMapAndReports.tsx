import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/app/AppContext.tsx";
import zipState from "zip-state";
import { getRelativeDate, getStateName } from "@/utils/utils.ts";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const states = ["California", "Colardo", "Nevada", "Oklahoma", "Arizona"];

export const LandingMapAndReports = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedReport, setSelectedReport] = useState<{
    type: string;
    medication: string;
    location: string;
    date: string;
  }>();
  const [isFading, setIsFading] = useState(false);
  const { notifications } = useContext(AppContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("selecting random state");
      const report = (notifications ?? [])[
        Math.floor(Math.random() * states.length)
      ];
      setIsFading(true);
      setTimeout(() => {
        const location = zipState(report.zipCode);
        if (!location) {
          return;
        }
        setSelectedReport({
          type: report.type,
          medication: report.medication,
          location: getStateName(location),
          date: getRelativeDate(report.createdAt),
        });
        setSelectedState(getStateName(location));
        setIsFading(false);
      }, 500);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [notifications, selectedState]);

  return (
    <>
      <div className={""}>
        <ComposableMap projection="geoAlbersUsa" width={1152}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    geo.properties.name === selectedState
                      ? "#FDB462"
                      : "#D6D6DA"
                  }
                  stroke="#FFFFFF"
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
      {selectedReport && (
        <div
          className={`mt-5 report-container ${isFading ? "fade-out" : "fade-in"}`}
        >
          <span className={"flex gap-x-1 items-center justify-center text-sm"}>
            <p className={"text-2xl"}>
              {selectedReport.type === "SHORTAGE" ? "⚡" : "🙌"}
            </p>
            {selectedReport.type === "SHORTAGE" ? (
              <>
                <p className={"font-bold"}>Patient</p> report shortage in
                <p className={"font-bold"}>
                  {selectedReport.medication}
                </p>in {selectedReport.location}
                <p className={"lowercase font-light text-xs"}>
                  ({selectedReport.date})
                </p>
              </>
            ) : (
              <>
                <p className={"font-bold"}>Supplier</p> found
                <p className={"font-bold"}>{selectedReport.medication}</p>
                shortage in {selectedReport.location}
                <p className={"lowercase font-light text-xs"}>
                  ({selectedReport.date})
                </p>
              </>
            )}
          </span>
        </div>
      )}
    </>
  );
};
