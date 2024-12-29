export interface MedicationDoses {
  uuid: string;
  name: string;
  doses: DosesForm[];
}

export interface DosesForm {
  uuid: string;
  name: string;
}
