import { ReactNode, useCallback, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { MedicationNotification } from "@/types/notifications";
import { useMedications } from "@/hooks/use-medications";
import { MedicationDoses } from "@/types/medications-doses";
import { MedicationReports } from "@/types/medications-reports";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { getMedications, getNotifications, getReports } = useMedications();

  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState<MedicationNotification[]>();
  const [medications, setMedications] = useState<MedicationDoses[]>();
  const [reports, setReports] = useState<MedicationReports[]>();

  const handleWindowSizeChange = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const loadInitialData = useCallback(async () => {
    const [{ data: notifications }, { data: medications }, { data: reports }] = await Promise.all([
      getNotifications(),
      getMedications(),
      getReports(),
    ]);
    setMedications(medications);
    setNotifications(notifications);
    setReports(reports);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) {
      loadInitialData();
    }
  }, []);

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  return (
    <AppContext.Provider value={{ isLoading, setIsLoading, isMobile, notifications, medications, reports }}>
      {children}
    </AppContext.Provider>
  );
};
