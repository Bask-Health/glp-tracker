import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AppContext } from './AppContext.tsx';
import { MedicationNotification } from '@/types/notifications.ts';
import { useMedications } from '@/hooks/use-medications.ts';
import { MedicationDoses } from '@/types/medications-doses.ts';
import { MedicationReports } from '@/types/medications-reports.ts';

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
    const { data: notifications } = await getNotifications();
    const { data: medications } = await getMedications();
    const { data: reports } = await getReports();
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
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  return (
    <AppContext.Provider value={{ isLoading, setIsLoading, isMobile, notifications, medications, reports }}>
      {children}
    </AppContext.Provider>
  );
};
