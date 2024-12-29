import { useCallback } from 'react';
import axios from '@/shared/api-client.ts';

export const useMedications = () => {
  const getMedications = useCallback(async () => {
    return await axios.get('/medications');
  }, []);

  const getNotifications = useCallback(async () => {
    return await axios.get('/medications/recent-reports');
  }, []);

  const getReports = useCallback(async () => {
    return await axios.get('/medications/historical-reports');
  }, []);

  return { getMedications, getNotifications, getReports };
};
