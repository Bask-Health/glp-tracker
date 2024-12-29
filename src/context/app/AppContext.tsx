"use client";

import React, { createContext } from "react";
import { MedicationNotification } from "@/types/notifications";
import { MedicationDoses } from "@/types/medications-doses";
import { MedicationReports } from "@/types/medications-reports";

interface AppContext {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  notifications?: MedicationNotification[];
  medications?: MedicationDoses[];
  reports?: MedicationReports[];
}

export const AppContext = createContext<AppContext>({
  setIsLoading: () => {
    throw new Error("setIsLoading must be used within AppProvider");
  },
  isLoading: false,
  isMobile: false,
});
