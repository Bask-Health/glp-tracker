import { MedicationReports } from '@/types/medications-reports.ts';
import { DOSE_STATUS } from '@/constants/enums.ts';

interface MedicationCardProps {
  report: MedicationReports;
}

const STATUS_MESSAGES = {
  [DOSE_STATUS.CURRENTLY_SHORTAGE]: "Available according to the FDA but we're receiving reports of supply issues.",
  [DOSE_STATUS.CURRENT_SHORTAGE_NOT_FOUND]: 'In shortage. Estimated shortage duration TBD',
  [DOSE_STATUS.SHORTAGE_RESOVLED]:
    "Shortage resolved according to the FDA but we're receiving reports of supply issues.",
};
const STATUS_ICONS = {
  [DOSE_STATUS.CURRENTLY_SHORTAGE]: '😒',
  [DOSE_STATUS.CURRENT_SHORTAGE_NOT_FOUND]: '🔴',
  [DOSE_STATUS.SHORTAGE_RESOVLED]: '😒',
};

export const MedicationCard = ({ report }: MedicationCardProps) => {
  return (
    <div>
      <div className={'flex justify-start gap-x-2 bg-r-gray-200 pt-2'}>
        <img className={'max-w-24'} src={report.imageUrl} alt={report.medicationName} />
        <div>
          <p className={'text-2xl font-semibold'}>{report.medicationName}</p>
          <p className={'text-r-gray-100'}>
            {[DOSE_STATUS.CURRENTLY_SHORTAGE, DOSE_STATUS.CURRENT_SHORTAGE_NOT_FOUND].includes(report.status)
              ? 'Currently in shortage'
              : 'Shortage Resolved'}
          </p>
        </div>
      </div>
      <div className={'bg-white py-5 px-3'}>
        {report.reports.map((item, index) => (
          <div
            key={item.dosename}
            className={`flex gap-x-3 ${index === report.reports.length - 1 ? '' : 'border-b pb-3 mb-3 '}`}
          >
            <p className={'text-3xl'}>{STATUS_ICONS[report.status]}</p>
            <div className={`w-full`}>
              <div key={item.dosename} className={'flex justify-between'}>
                <p className={'text-xl font-semibold'}>{item.dosename}</p>
                <p className={'bg-r-gray-200 py-1 px-2 rounded-2xl font-semibold'}>⚡ {item.count} recent reports</p>
              </div>
              <p className={' mt-3'}>{STATUS_MESSAGES[report.status]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
