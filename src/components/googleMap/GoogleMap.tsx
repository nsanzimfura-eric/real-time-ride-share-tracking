import { GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { StopInterface, kigaliKimironkoBusStops } from '../../utils/routeStopsData';
import { useEffect, useState } from 'react';
import { setCurrentStop } from '../formMapData/GoogleMapDataSlice';
export interface MapProps {
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
}

const containerStyle = {
    width: "100%",
    height: "100%",
    flexGrow: "1"
}

const GoogleMapComponent = (props: MapProps) => {
    const { setMap } = props;
    const { googleDirectionServiceResults, isDriving, driverSpeed, totalDuration } = useSelector((state: RootState) => state.googleDirectionServicesReducers);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | google.maps.LatLng>(kigaliKimironkoBusStops[0].position);
    const [currentStation, setCurrentStation] = useState<StopInterface>(kigaliKimironkoBusStops[0]);
    const dispatch = useDispatch()

    const findClosestStop = (currentPos: google.maps.LatLngLiteral | google.maps.LatLng, stops: StopInterface[]): StopInterface | undefined => {
        let closestStop = stops[0];
        let minDistance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(currentPos),
            new google.maps.LatLng(stops[0].position)
        );

        for (const stop of stops) {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(currentPos),
                new google.maps.LatLng(stop.position)
            );
            if (distance < minDistance) {
                closestStop = stop;
                minDistance = distance;
            }
        }
        return closestStop;
    };

    const extractPathFromDirections = (directionsResult: google.maps.DirectionsResult): google.maps.LatLng[] => {
        let path: google.maps.LatLng[] = [];
        const route = directionsResult.routes[0];
        for (const leg of route.legs) {
            for (const step of leg.steps) {
                path = path.concat(step.path);
            }
        }
        return path;
    }

    // start moving with the vehicle
    useEffect(() => {
        if (driverSpeed && isDriving && googleDirectionServiceResults) {
            const paths = extractPathFromDirections(googleDirectionServiceResults);
            const distancePerStep = driverSpeed * (totalDuration / paths.length);// distance travelled in one step

            let step = 0;
            // const intervalTime = totalDuration / paths.length;
            const intervalTime = (paths.length / driverSpeed) * distancePerStep;

            const moveMarker = () => {
                if (step < paths.length) {
                    const newPos = paths[step];
                    setMarkerPosition(newPos);
                    const closestStop = findClosestStop(newPos, kigaliKimironkoBusStops);
                    console.log(closestStop, 'closestStop')
                    if (closestStop) setCurrentStation(closestStop);
                    step++;
                } else {
                    clearInterval(intervalId);
                }
            };
            const intervalId = setInterval(moveMarker, intervalTime);
            return () => clearInterval(intervalId);
        }
        //eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [isDriving, driverSpeed]);

    // google map  icons
    const googleMapMarkerIcon = {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z",
        fillColor: "purple",
        fillOpacity: 1.0,
        strokeWeight: 1,
        strokeColor: "red",
        scale: 3,
        anchor: new google.maps.Point(12, 24),
    };

    // watch next bus stop
    useEffect(() => {
        dispatch(setCurrentStop(currentStation));
        //eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [currentStation]);

    const renderGogosKimironkoBusStops = () => kigaliKimironkoBusStops.map((stopStation, index) => (
        <MarkerF key={index} position={stopStation.position} label={stopStation.name} />
    ));


    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={kigaliKimironkoBusStops[0].position}
            zoom={15}
            onLoad={(mapInstance: google.maps.Map) => setMap(mapInstance)}
        >
            {/* all bus stops are fixed by location */}
            {renderGogosKimironkoBusStops()}
            <MarkerF
                position={googleDirectionServiceResults ? markerPosition : kigaliKimironkoBusStops[0].position}
                label={googleDirectionServiceResults && currentStation ? currentStation.name : ""}
                icon={googleMapMarkerIcon}
            />
            {googleDirectionServiceResults && <DirectionsRenderer directions={googleDirectionServiceResults} />}
        </GoogleMap>
    )
}

export default GoogleMapComponent