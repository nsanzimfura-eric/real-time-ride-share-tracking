import { GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { googleMapMarkerIcon } from '../../utils/googleMapMarkerIcon';
import { kigaliKimironkoBusStops } from '../../utils/routeStopsData';
import { useEffect, useState } from 'react';
export interface MapProps {
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
}

const GoogleMapComponent = (props: MapProps) => {
    const { setMap } = props;
    const { googleDirectionServiceResults, isDriving, driverSpeed } = useSelector((state: RootState) => state.googleDirectionServicesReducers);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | google.maps.LatLng>(kigaliKimironkoBusStops[0].position);


    const containerStyle = {
        width: "100%",
        height: "100%",
        flexGrow: "1"
    }

    // const renderGogosKimironkoBusStops = () => kigaliKimironkoBusStops.map((stopStation, index) => (
    //     <MarkerF key={index} position={stopStation.position} label={stopStation.name} />
    // ));

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

    // start moviingwith the vehicle
    useEffect(() => {
        if (driverSpeed && isDriving && googleDirectionServiceResults) {
            const paths = extractPathFromDirections(googleDirectionServiceResults);
            let step = 0;
            const moveMarker = () => {
                if (step < paths.length) {
                    setMarkerPosition(paths[step]);
                    step += 1;
                } else {
                    clearInterval(intervalId); // Stop the interval when path ends
                }
            };
            const intervalId = setInterval(moveMarker, 1000 / driverSpeed);
            return () => clearInterval(intervalId);
        }

    }, [isDriving, driverSpeed]);

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={kigaliKimironkoBusStops[0].position}
            zoom={15}
            onLoad={(mapInstance: google.maps.Map) => setMap(mapInstance)}
        >
            {/* {renderGogosKimironkoBusStops()} */}
            <MarkerF
                position={markerPosition || kigaliKimironkoBusStops[0].position}
                label={kigaliKimironkoBusStops[0].name}
                icon={googleMapMarkerIcon}
            />
            {googleDirectionServiceResults && <DirectionsRenderer directions={googleDirectionServiceResults} />}
        </GoogleMap>
    )

}

export default GoogleMapComponent