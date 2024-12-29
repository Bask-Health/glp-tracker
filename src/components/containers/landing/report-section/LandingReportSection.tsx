import { Button } from '../../../shared/button/Button.tsx';
import { Dialog } from '@/components/shared/dialog/Dialog.tsx';
import { useCallback, useState } from 'react';
import { GLPFoundMedicationForm } from '@/components/containers/landing/forms/glp-form-found/GLPFoundForm.tsx';
import { GLPMissingForm } from '@/components/containers/landing/forms/glp-missing-form/GLPMissingForm.tsx';

export const LandingReportSection = () => {
  const [isFoundGlpModalOpen, setIsFoundGlpModalOpen] = useState(false);
  const [isMissingGlpModalOpen, setIsMissingGlpModalOpen] = useState(false);

  const onFoundGLPSClick = useCallback(() => {
    setIsFoundGlpModalOpen(true);
  }, []);

  const onMissingGLPSClick = useCallback(() => {
    setIsMissingGlpModalOpen(true);
  }, []);
  return (
    <>
      <Dialog isOpen={isFoundGlpModalOpen} setIsOpen={setIsFoundGlpModalOpen}>
        <GLPFoundMedicationForm setOpen={setIsFoundGlpModalOpen} />
      </Dialog>

      <Dialog isOpen={isMissingGlpModalOpen} setIsOpen={setIsMissingGlpModalOpen}>
        <GLPMissingForm setOpen={setIsMissingGlpModalOpen} />
      </Dialog>
      <div className={'flex justify-center border-b-[1px] pb-5'}>
        <div className={'mt-10'}>
          <p className={'text-xl font-semibold'}>Let’s help each other track and find GLP-1 supply.</p>
          <div className={'grid grid-cols-1 2xl:grid-cols-2 gap-6 text-r-gray-100'}>
            <div className={'mt-3'}>
              <p className={'font-semibold'}>Need supply?</p>
              <p className={'mb-4'}>
                We'll let you know when supply is found nearby and notify the FDA about the shortage.
              </p>
            </div>
            <div className={'mt-3 2xl:pl-4 2xl:border-l 2xl:border-l-gray-300'}>
              <p className={'font-semibold'}>Found supply?</p>
              <p className={'mb-4'}>Share with us and we’ll notify patients nearby.</p>
            </div>
          </div>
          <div className={'grid grid-cols-1 2xl:grid-cols-2 gap-6 text-r-gray-100 mt-4'}>
            <div>
              <Button onClick={onMissingGLPSClick} color={'primary'}>
                I can't find GLP-1s ⚡
              </Button>
            </div>
            <div className={' xl:pl-4'}>
              <Button onClick={onFoundGLPSClick} color={'secondary'}>
                I found GLP-1s 🙌
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
