import * as Yup from "yup";
import { kigaliKimironkoBusStops } from "../../utils/routeStopsData";

export const validationSchema = Yup.object({
  destination: Yup.string().required("Enter Your Destination"),
  origin: Yup.string().required("Enter Your Origin"),
});

export const initialValues = {
    destination: kigaliKimironkoBusStops[0].name,
    origin: kigaliKimironkoBusStops[kigaliKimironkoBusStops.length-1].name,
};
