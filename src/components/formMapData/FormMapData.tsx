import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './formMapaData.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setGoogleDirectionServices, setDriverSpeed, setIsDriving } from './GoogleMapDataSlice';
import { kigaliKimironkoBusStops } from '../../utils/routeStopsData';
import { RootState } from '../../redux/store';

export interface GoogleMapsDataProps {
    map: google.maps.Map | null;
}

const initialOrigin = { origin: '', destination: '' };

const FormMapData = (props: GoogleMapsDataProps) => {
    const { map } = props;
    const [duration, setDuration] = useState<string>('');
    const [distance, setDistance] = useState<string>('');
    const [places, setPlaces] = useState<{ origin: string, destination: string }>(initialOrigin);

    const { googleDirectionServiceResults } = useSelector((state: RootState) => state.googleDirectionServicesReducers)
    const dispatch = useDispatch();

    const handleSetMapBack = () => {
        map?.panTo(kigaliKimironkoBusStops[0].position);
        dispatch(setGoogleDirectionServices(null));
        setDuration('');
        setDistance('');
        setPlaces(initialOrigin);
        dispatch(setIsDriving(false));
        dispatch(setDriverSpeed(0));
    }

    const startDriving = () => {
        //calculate speed
        const distanceTravelled = distance.split(' ')?.[0] || 0; /// in km
        const timeUsed = duration.split(' ')?.[0] || 1; // in minutes
        // speed is equal to distance over time
        const speed = (Number(distanceTravelled) * 1000) / (Number(timeUsed) * 60) // in m/s
        dispatch(setDriverSpeed(speed));//global vehicle speed
        dispatch(setIsDriving(true));// start moviing permition
    }

    useEffect(() => {
        if (googleDirectionServiceResults) {
            setDuration(googleDirectionServiceResults?.routes[0]?.legs[0]?.duration?.text || '');
            setDistance(googleDirectionServiceResults?.routes[0]?.legs[0]?.distance?.text || '');
            const place = {
                origin: googleDirectionServiceResults?.routes[0]?.legs[0]?.start_address || '',
                destination: googleDirectionServiceResults?.routes[0]?.legs[0]?.end_address || ''
            }
            setPlaces(place);
        } else {
            handleSetMapBack()//clean map and back to the center
        }

    }, [googleDirectionServiceResults])


    return (
        <Container className={styles.formMapData}>
            <div className='wrapperData d-flex flex-column'>
                <div className='d-flex align-items-center'>
                    <h3>{places?.origin}</h3>
                    <span> - </span>
                    <h3>{places?.destination}</h3>
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