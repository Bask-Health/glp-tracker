import { DOSE_STATUS } from "../constants/enums.ts";

export interface Medication {
  title: string;
  img: string;
  status: (typeof DOSE_STATUS)[keyof typeof DOSE_STATUS];
  reports: { dose: string; reports: number }[];
}
