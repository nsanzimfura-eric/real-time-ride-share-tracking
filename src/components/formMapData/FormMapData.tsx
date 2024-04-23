import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './formMapaData.module.scss';
import { useDispatch } from 'react-redux';
import { setGoogleDirectionServices } from './GoogleMapDataSlice';
import { PlacesDataInterface } from '../../pages/home/Home';
import { MapFormProps } from '../mapForm/MapForm';
import { kigaliKimironkoBusStops } from '../../utils/routeStopsData';
import { initialValues } from '../mapForm/validationSchema';


export interface GoogleMapsDataProps extends MapFormProps {
    map: google.maps.Map | null;
    placesData: PlacesDataInterface;
}

const FormMapData = (props: GoogleMapsDataProps) => {
    const { map, placesData, setPlacesData } = props;
    const [duration, setDuration] = useState<string>('');
    const [distance, setDistance] = useState<string>('');

    const dispatch = useDispatch();

    const handleSetMapBack = () => {
        setPlacesData(initialValues);
        map?.panTo(kigaliKimironkoBusStops[0].position);
        dispatch(setGoogleDirectionServices(null));
        setDuration('');
        setDistance('');
    }

    const startDriving = () => {
        alert('StartDriving')

    }

    const calculateDistance = async (): Promise<void> => {
        const origin = placesData?.origin;
        const destination = placesData?.destination;
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
        });
        dispatch(setGoogleDirectionServices(JSON.stringify(results)));
        setDuration(results?.routes[0]?.legs[0]?.duration?.text || '');
        setDistance(results?.routes[0]?.legs[0]?.distance?.text || '');
    }

    useEffect(() => {
        //calculate distance
        void calculateDistance();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className={styles.formMapData}>
            <div className='wrapperData d-flex flex-column'>
                <div className='d-flex align-items-center'>
                    <h3>{placesData?.origin}</h3>
                    <span>-</span>
                    <h3>{placesData?.destination}</h3>
                </div>
                <span > Next stop: Kakiru</span>
                <div className='d-flex'>
                    <span > Distance: {distance}</span>
                    <span > Time: {duration}</span>
                </div>
                <div className='d-flex justify-content-between align-items-center w-100 mt-3 actions'>
                    <button className='btn' onClick={handleSetMapBack}>cancel</button>
                    <button className='btn btn-success' onClick={startDriving}>Start Driving</button>
                </div>
            </div>
        </Container>
    );
};

export default FormMapData;