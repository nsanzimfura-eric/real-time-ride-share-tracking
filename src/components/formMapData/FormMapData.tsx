import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './formMapaData.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { kigaliKimironkoBusStops } from '../../utils/routeStopsData';
import { RootState } from '../../redux/store';
import { calculateReadableTimeFromSeconds } from '../../utils/calculateReadableTimeFromSeconds';
import {
    setGoogleDirectionServices,
    setIsDriving, setTotalDuration,
    setTotalDistance, setCurrentStop,
    setDistanceLeft,
    setDurationLeft
} from './GoogleMapDataSlice';

export interface GoogleMapsDataProps {
    map: google.maps.Map | null;
}

const initialOrigin = { origin: '', destination: '' };

const FormMapData = (props: GoogleMapsDataProps) => {
    const { map } = props;
    const [places, setPlaces] = useState<{ origin: string, destination: string }>(initialOrigin);

    const { googleDirectionServiceResults, currentStop, isDriving, totalDistance, totalDuration, durationLeft, distanceLeft } = useSelector((state: RootState) => state.googleDirectionServicesReducers)
    const dispatch = useDispatch();

    const handleSetMapBack = () => {
        map?.panTo(kigaliKimironkoBusStops[0].position);
        dispatch(setGoogleDirectionServices(null));
        setPlaces(initialOrigin);
        dispatch(setIsDriving(false));
        dispatch(setTotalDuration(0));
        dispatch(setTotalDistance(0));
        dispatch(setCurrentStop(kigaliKimironkoBusStops[1]));
    }

    const startDriving = () => {

        dispatch(setIsDriving(true));// start moving permission
    }

    useEffect(() => {
        if (googleDirectionServiceResults) {
            const legs = googleDirectionServiceResults?.routes[0]?.legs;
            let totalDistance = 0;
            let totalDuration = 0;
            legs.forEach((leg: google.maps.DirectionsLeg) => {
                const dist = leg?.distance?.value || 0;
                const dur = leg?.duration?.value || 0;
                totalDistance += dist;
                totalDuration += dur;
            });
            dispatch(setTotalDuration(totalDuration)); //time taken in seconds
            dispatch(setTotalDistance(totalDistance));
            dispatch(setDistanceLeft(totalDistance));// no movement yet, so all distance is left
            dispatch(setDurationLeft(totalDuration));// no movement yet, so all time is left
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
                <div className='d-flex justify-content-between w-100'>
                    <span >Total Distance: {totalDistance > 1000 ? `${totalDistance / 1000} km` : `${totalDistance} m`}</span>
                    <span >Total Time: {calculateReadableTimeFromSeconds(totalDuration)}</span>
                </div>
                {isDriving &&
                    <div className='d-flex justify-content-between w-100'>
                        <small >Distance Left: {distanceLeft > 1000 ? `${distanceLeft / 1000} km` : `${distanceLeft} m`}</small>
                        <small >Time Left: {calculateReadableTimeFromSeconds(durationLeft)}</small>
                    </div>
                }
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