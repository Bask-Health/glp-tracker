import { MedicationCard } from '../medication-card/MedicationCard.tsx';
import { useContext } from 'react';
import { AppContext } from '@/context/app/AppContext.tsx';

export const LandingShortageSection = () => {
  const { reports } = useContext(AppContext);
  return (
    <div className={'mt-5'}>
      <p className={'text-xl font-semibold'}>GLP-1 Shortage Status</p>
      <p className={'text-lg text-r-gray-100'}>
        See the shortage status of GLP-1s according to the FDA and how it compares against community reports.
      </p>
      <div className={'mt-5'}>
        <div className={'grid grid-cols-1 2xl:grid-cols-2 gap-5'}>
          {reports?.length && reports.map((report) => <MedicationCard key={report.medicationName} report={report} />)}
        </div>
      </div>
    </div>
  );
};
