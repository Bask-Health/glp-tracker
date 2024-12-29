import { subdivision } from "iso-3166-2";
import moment from "moment";

export const getStateName = (isoCode: string): string => {
  const usStates = subdivision("US", isoCode);
  return usStates?.name ?? "Unknown";
};

export const getRelativeDate = (date: Date) => {
  return moment(date).fromNow();
};
