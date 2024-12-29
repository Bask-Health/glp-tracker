import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MissingFormSchema } from './missing-form.schema.ts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { REPORTER_TYPE } from '@/constants/enums.ts';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { Label } from '@/components/ui/label.tsx';
import { MedicationSubForm } from '@/components/containers/landing/forms/components/medications-sub-form/MedicationSubForm.tsx';
import { GLPMissingReactHookForm } from '@/types/forms/glp-missing-form.ts';
import { Separator } from '@/components/ui/separator';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { AppContext } from '@/context/app/AppContext.tsx';
import { useReports } from '@/hooks/use-reports.ts';
import { useToast } from '@/hooks/use-toast.ts';

interface GLPMissingFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const GLPMissingForm = ({ setOpen }: GLPMissingFormProps) => {
  const { medications } = useContext(AppContext);
  const { createMissingReport } = useReports();
  const { toast } = useToast();
  const form = useForm<GLPMissingReactHookForm>({
    resolver: yupResolver(MissingFormSchema),
    defaultValues: {
      medications: [],
      email: '',
      zipCode: '',
    },
  });

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data: GLPMissingReactHookForm) => {
    try {
      setIsPending(true);
      await createMissingReport(data);
      setOpen(false);
      toast({ title: 'Report sent successfully!', variant: 'success' });
    } catch (ex) {
      console.error(ex);
      toast({ title: 'Report failed to send!', variant: 'destructive' });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <p className={'text-xl mb-2 font-semibold'}>Submit a missing GLP-1 Medication</p>
      <Separator className={'my-4'} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ZipCode</FormLabel>
              <FormControl>
                <Input placeholder="Zip Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {medications && <MedicationSubForm medicationsDoses={medications} />}

        <FormField
          control={form.control}
          name="reporterType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who are you?</FormLabel>
              <FormControl>
                <RadioGroup value={field.value ?? ''} onValueChange={field.onChange}>
                  <div className={'flex gap-x-2'}>
                    {Object.values(REPORTER_TYPE).map((type) => (
                      <div key={`reporter-type-${type}`} className="flex items-center space-x-2">
                        <RadioGroupItem value={type} id={type} />
                        <Label className={'capitalize'} htmlFor={type}>
                          {type?.toString().toLowerCase()}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className={'my-4'} />

        <Button className={'w-full'} type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
