import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { GLPFoundReactHookForm } from '@/types/forms/glp-found-form.ts';
import { MedicationSubForm } from '@/components/containers/landing/forms/components/medications-sub-form/MedicationSubForm.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { AppContext } from '@/context/app/AppContext.tsx';
import { FoundMedicationFormSchema } from '@/components/containers/landing/forms/glp-form-found/found-medication-form.schema.ts';
import { useReports } from '@/hooks/use-reports.ts';
import { useToast } from '@/hooks/use-toast.ts';

interface GLPFoundMedicationProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const GLPFoundMedicationForm = ({ setOpen }: GLPFoundMedicationProps) => {
  const { medications } = useContext(AppContext);
  const { createFoundReport } = useReports();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<GLPFoundReactHookForm>({
    resolver: yupResolver(FoundMedicationFormSchema),
    defaultValues: {
      medications: [],
      email: '',
      pharmacyAddress: '',
    },
  });

  const onSubmit = async (data: GLPFoundReactHookForm) => {
    try {
      setIsPending(true);
      await createFoundReport(data);
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
      <p className={'text-xl mb-2 font-semibold'}>I found a GLP-1 Medication</p>
      <Separator className={'my-4'} />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="pharmacyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pharmacy Address</FormLabel>
              <FormControl>
                <Input placeholder="Pharmacy Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {medications && <MedicationSubForm medicationsDoses={medications} />}

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
