import * as Yup from "yup";

export const validationSchema = Yup.object({
  destination: Yup.string().required("Enter Your Destination"),
  origin: Yup.string().required("Enter Your Origin"),
});

export const initialValues = {
    destination: "",
    origin: "",
};
