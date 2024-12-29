import { REPORTER_TYPE } from "@/constants/enums.ts";

export interface GLPMissingReactHookForm {
  zipCode: string;
  medications: { uid: string; dose: string[] }[];
  reporterType: (typeof REPORTER_TYPE)[keyof typeof REPORTER_TYPE];
  email: string;
}
