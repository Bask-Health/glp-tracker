import { useFormContext } from 'react-hook-form';
import { FC } from 'react';
import { DosesForm, MedicationDoses } from '@/types/medications-doses.ts';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { CheckedState } from '@radix-ui/react-checkbox';
import { GLPMissingReactHookForm } from '@/types/forms/glp-missing-form.ts';

interface MedicationDoseProps {
  medicationUid: string;
  doses: DosesForm[];
}

interface MedicationSubFormProps {
  medicationsDoses: MedicationDoses[];
}

const MedicationDose: FC<MedicationDoseProps> = ({ medicationUid, doses }) => {
  const { watch, setValue } = useFormContext<GLPMissingReactHookForm>();
  const fieldName = `medications`;
  const medications = watch(`${fieldName}`);
  const currentOwner = medications.find((item) => item.uid === medicationUid);
  if (!currentOwner) {
    return null;
  }

  const currentChecked = currentOwner.dose ?? [];
  const onCheck = (checked: CheckedState, doseUid: string) => {
    let newDoses: undefined | Set<string>;
    if (checked) {
      newDoses = new Set<string>([...currentChecked, doseUid]);
    } else {
      newDoses = new Set<string>([...currentChecked.filter((item) => item !== doseUid)]);
    }
    const medicationIndex = medications.findIndex((item) => item.uid === medicationUid);
    medications[medicationIndex].dose = Array.from(newDoses);
    setValue(`medications`, [...medications]);
  };
  return (
    <div className="space-y-1 pl-3 pt-3" key={`${fieldName}.dose-${medicationUid}-byd`}>
      {doses.map((dose) => (
        <div key={`${fieldName}.dose-${dose.uuid}-asd`}>
          <FormItem className={'space-x-2'}>
            <FormControl>
              <Checkbox
                id={`dose-${dose.uuid}`}
                onCheckedChange={(checked) => {
                  onCheck(checked, dose.uuid);
                }}
              />
            </FormControl>
            <FormLabel>{dose.name}</FormLabel>
          </FormItem>
        </div>
      ))}
    </div>
  );
};
export const MedicationSubForm = ({ medicationsDoses }: MedicationSubFormProps) => {
  const {
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext<GLPMissingReactHookForm>();

  const onCheckChange = (checked: CheckedState, medicationDoseField: MedicationDoses) => {
    const medications = getValues('medications') ?? [];
    if (checked) {
      setValue('medications', [...medications, { uid: medicationDoseField.uuid, dose: [] }]);
    } else {
      setValue(
        'medications',
        medications.filter((medication) => medication.uid !== medicationDoseField.uuid),
      );
    }
  };

  return (
    <div className="space-y-3">
      <p className={`mb-1 text-sm font-semibold ${errors?.medications ? 'text-destructive' : ''}`}>Medications</p>
      {medicationsDoses.map((medicationDoseField: MedicationDoses) => {
        return (
          <div key={`medication-subform-${medicationDoseField.uuid}`}>
            <FormItem className={'space-x-2'}>
              <FormControl>
                <Checkbox onCheckedChange={(checked) => onCheckChange(checked, medicationDoseField)} />
              </FormControl>
              <FormLabel>{medicationDoseField.name}</FormLabel>
            </FormItem>
            <MedicationDose medicationUid={medicationDoseField.uuid} doses={medicationDoseField.doses} />
          </div>
        );
      })}
      <div>
        {/* @ts-expect-error TS2722: Cannot invoke an object which is possibly undefined*/}
        {errors?.medications?.map((item) => (
          <div className={'text-destructive text-sm font-semibold'} key={`error-medication-subform-${item?.message}`}>
            <p>{item?.dose?.message}</p>
            <p>{item?.message}</p>
          </div>
        )) ?? null}
      </div>
    </div>
  );
};
