import * as yup from "yup";
import zipState from "zip-state";

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
  zipCode: yup
    .string()
    .required("ZipCode is required")
    .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid ZipCode")
    .test("is-valid-zip-code", "ZipCode must be in the US", (value) => {
      return !!zipState(value);
    }),
});
