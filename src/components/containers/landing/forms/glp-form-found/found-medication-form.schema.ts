import * as yup from "yup";

export const FoundMedicationFormSchema = yup.object().shape({
  pharmacyAddress: yup.string().required(),
  email: yup.string().email().required(),
  medications: yup
    .array(
      yup.object({
        uid: yup.string().required(),
        dose: yup.array(yup.string().required()).required().min(1),
      }),
    )
    .required(),
});
