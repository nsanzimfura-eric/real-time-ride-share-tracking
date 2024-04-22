import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './formMapaData.module.scss';
import { MapProps } from '../googleMap/GoogleMap';
import { googleMapCenter, initialGoogleMapState } from '../../utils/constants';


const FormMapData = (props: MapProps) => {
    const { map, placesData, setPlacesData } = props;
    const [googleDirection, setGoogleDirection] = useState<google.maps.DirectionsResult | null>(null);
    const [duration, setDuration] = useState<string>('');
    const [distance, setDistance] = useState<string>('');

    const handleSetMapBack = () => {
        setPlacesData(initialGoogleMapState);
        map?.panTo(googleMapCenter);
        setGoogleDirection(null);
        setDuration('');
        setDistance('');
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
        setGoogleDirection(results);
        setDuration(results?.routes[0]?.legs[0]?.duration?.text || '');
        setDistance(results?.routes[0]?.legs[0]?.distance?.text || '');
    }
    useEffect(() => {
        //calculate distance
        void calculateDistance();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(duration, distance, googleDirection, 'test')
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
                    <span > Distance: {distance}KM</span>
                    <span > Time: {duration}minutes</span>
                </div>
                <div className='d-flex justify-content-center align-items-center w-100 mt-3'><button className='btn' onClick={handleSetMapBack}>Clear</button></div>
            </div>
        </Container>
    );
};

export default FormMapData;