import { useCallback } from 'react';
import axios from '@/shared/api-client.ts';
import { GLPMissingReactHookForm } from '@/types/forms/glp-missing-form.ts';
import { GLPFoundReactHookForm } from '@/types/forms/glp-found-form.ts';

export const useReports = () => {
  const createMissingReport = useCallback(async (body: GLPMissingReactHookForm) => {
    const { data } = await axios.post('/medications/missing-supply', body);
    return data;
  }, []);

  const createFoundReport = useCallback(async (body: GLPFoundReactHookForm) => {
    const { data } = await axios.post('/medications/found-supply', body);
    return data;
  }, []);

  return { createMissingReport, createFoundReport };
};
