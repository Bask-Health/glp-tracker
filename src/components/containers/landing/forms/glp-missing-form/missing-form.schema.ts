import * as yup from "yup";
import { REPORTER_TYPE } from "@/constants/enums.ts";
import zipState from "zip-state";

export const MissingFormSchema = yup.object().shape({
  zipCode: yup
    .string()
    .required("ZipCode is required")
    .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid ZipCode")
    .test("is-valid-zip-code", "ZipCode must be in the US", (value) => {
      return !!zipState(value);
    }),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("You must enter your email"),
  reporterType: yup
    .string()
    .required("You must select a reporter type")
    .oneOf(Object.values(REPORTER_TYPE)),
  medications: yup
    .array(
      yup.object({
        uid: yup.string().required(),
        dose: yup
          .array(yup.string().required("You must select at least one dose"))
          .required("Dose is required")
          .min(1, "You must select at least one dose"),
      }),
    )
    .required("You must select at least one medication"),
});
