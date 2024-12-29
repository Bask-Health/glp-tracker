export interface MedicationReports {
  medicationName: string;
  imageUrl: string;
  status: string;
  reports: ReportsDoseDto[];
}

interface ReportsDoseDto {
  count: number;
  dosename: string;
}
