import { Container } from 'react-bootstrap';
import styles from './mapForm.module.scss';
import { Autocomplete } from '@react-google-maps/api';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './validationSchema';
import { setGoogleDirectionServices } from '../formMapData/GoogleMapDataSlice';
import { useDispatch } from 'react-redux';



const MapForm = () => {
    const dispatch = useDispatch();

    const calculateDistance = async (origin: string, destination: string): Promise<void> => {
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
        });
        dispatch(setGoogleDirectionServices(JSON.stringify(results)));
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const { origin, destination } = values;
            await calculateDistance(origin, destination);
        },
    });

    return (
        <Container className={styles.mapForm}>
            <form className='formWrapper bg-none d-flex' onSubmit={formik.handleSubmit}>
                <Autocomplete>
                    <div className='d-flex flex-column'>
                        <input
                            type="text"
                            placeholder='Origin'
                            name='origin'
                            id='origin'
                            value={formik.values.origin}
                            onChange={formik.handleChange}
                        />
                        <div className='mt-1 errorWrapper'>
                            {formik.errors.origin && formik.touched.origin && <small className='mt-1'>{formik.errors.origin}</small>}
                        </div>
                    </div>
                </Autocomplete>
                <Autocomplete>
                    <div className='d-flex flex-column'>
                        <input
                            type="text"
                            placeholder='Destination'
                            name='destination'
                            id='destination'
                            value={formik.values.destination}
                            onChange={formik.handleChange}
                        />
                        <div className='mt-1 errorWrapper'>
                            {formik.errors.destination && formik.touched.destination && <small >{formik.errors.destination}</small>}
                        </div>
                    </div>
                </Autocomplete>
                <div className='d-flex flex-column'>
                    <button type='submit'>Calculate</button>
                    <div className='mt-1 errorWrapper  d-none d-sm-block'>
                    </div>
                </div>
            </form>
        </Container>
    );
};

export default MapForm;