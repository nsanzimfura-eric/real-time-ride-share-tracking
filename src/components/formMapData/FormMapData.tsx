import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './formMapaData.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setGoogleDirectionServices, setDriverSpeed, setIsDriving, setTotalDuration, setTotalDistance, setCurrentStop } from './GoogleMapDataSlice';
import { kigaliKimironkoBusStops } from '../../utils/routeStopsData';
import { RootState } from '../../redux/store';
import { calculateReadableTimeFromSeconds } from '../../utils/calculateReadableTimeFromSeconds';

export interface GoogleMapsDataProps {
    map: google.maps.Map | null;
}

const initialOrigin = { origin: '', destination: '' };

const FormMapData = (props: GoogleMapsDataProps) => {
    const { map } = props;
    const [duration, setDuration] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0);
    const [places, setPlaces] = useState<{ origin: string, destination: string }>(initialOrigin);

    const { googleDirectionServiceResults, currentStop, isDriving } = useSelector((state: RootState) => state.googleDirectionServicesReducers)
    const dispatch = useDispatch();

    const handleSetMapBack = () => {
        map?.panTo(kigaliKimironkoBusStops[0].position);
        dispatch(setGoogleDirectionServices(null));
        setDuration(0);
        setDistance(0);
        setPlaces(initialOrigin);
        dispatch(setIsDriving(false));
        dispatch(setDriverSpeed(0));
        dispatch(setTotalDuration(0));
        dispatch(setTotalDistance(0));
        dispatch(setCurrentStop(kigaliKimironkoBusStops[1]));
    }

    const startDriving = () => {
        // speed is equal to distance over time
        const durationDivider = duration || 1; //in seconds
        const speed = distance / durationDivider // in m/s
        dispatch(setDriverSpeed(speed));//global vehicle speed
        dispatch(setTotalDuration(duration)); //time taken in seconds
        dispatch(setTotalDistance(distance));
        dispatch(setIsDriving(true));// start moving permission
    }

    useEffect(() => {
        if (googleDirectionServiceResults) {
            const legs = googleDirectionServiceResults?.routes[0]?.legs;
            let totalDistance = 0;
            let totalDuration = 0;
            legs.forEach((leg: google.maps.DirectionsLeg) => {
                totalDistance += leg?.distance?.value || 0;
                totalDuration += leg?.duration?.value || 0;
            });
            setDistance(totalDistance);
            setDuration(totalDuration);

            const place = {
                origin: legs[0]?.start_address || '',
                destination: legs[legs?.length - 1]?.end_address || ''
            }
            setPlaces(place);
        } else {
            handleSetMapBack()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [googleDirectionServiceResults])

    // find next stop array from the list;
    const nextStopIndex = kigaliKimironkoBusStops.indexOf(currentStop);

    return (
        <Container className={styles.formMapData}>
            <div className='wrapperData d-flex flex-column'>
                <div className='d-flex align-items-center'>
                    <h3>{places?.origin}</h3>
                    <span> - </span>
                    <h3>{places?.destination}</h3>
                </div>
                <span > Next stop: {kigaliKimironkoBusStops[nextStopIndex + 1]?.name || currentStop.name}</span>
                <div className='d-flex'>
                    <span > Distance: {distance > 1000 ? `${distance / 1000} km` : `${distance} m`}</span>
                    <span > Time: {calculateReadableTimeFromSeconds(duration)}</span>
                </div>
                <div className='d-flex justify-content-between align-items-center w-100 mt-3 actions'>
                    <button className='btn' onClick={handleSetMapBack}>cancel</button>
                    {!isDriving && <button className='btn btn-success' onClick={startDriving}>Start Driving</button>}
                    {isDriving && <button className='btn btn-success' >Driving by Car</button>}
                </div>
            </div>
        </Container>
    );
};

export default FormMapData;