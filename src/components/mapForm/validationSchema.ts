import * as Yup from "yup";
import { kigaliKimironkoBusStops } from "../../utils/routeStopsData";

export const validationSchema = Yup.object({
  destination: Yup.string().required("Enter Your Destination"),
  origin: Yup.string().required("Enter Your Origin"),
});

export const initialValues = {
  origin: kigaliKimironkoBusStops[0].name,//Nyabugogo
  destination: kigaliKimironkoBusStops[kigaliKimironkoBusStops.length-1].name,//Kimironko
};
