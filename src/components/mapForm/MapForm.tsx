import { Container } from 'react-bootstrap';
import styles from './mapForm.module.scss';
import { Autocomplete } from '@react-google-maps/api';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './validationSchema';
import { PlacesDataInterface } from '../../pages/home/Home';


export interface MapFormProps {
    setPlacesData: React.Dispatch<React.SetStateAction<PlacesDataInterface>>;
}

const MapForm = (props: MapFormProps) => {
    const { setPlacesData } = props;

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setPlacesData({
                origin: values.origin,
                destination: values.destination,
            })
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
                            onChange={formik.handleChange}
                        />
                        <div className='mt-1 errorWrapper'>
                            {formik.errors.destination && formik.touched.destination && <small >{formik.errors.destination}</small>}
                        </div>
                    </div>
                </Autocomplete>
                <div className='d-flex flex-column'>
                    <button type='submit'>Start</button>
                    <div className='mt-1 errorWrapper  d-none d-sm-block'>
                    </div>
                </div>
            </form>
        </Container>
    );
};

export default MapForm;