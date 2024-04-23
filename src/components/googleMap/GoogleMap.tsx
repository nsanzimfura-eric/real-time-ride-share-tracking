import { GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { googleMapMarkerIcon } from '../../utils/googleMapMarkerIcon';
import { kigaliKimironkoBusStops } from '../../utils/routeStopsData';
import { useEffect } from 'react';
export interface MapProps {
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
}

const GoogleMapComponent = (props: MapProps) => {
    const { setMap } = props;
    const { googleDirectionServiceResults, isDriving, driverSpeed } = useSelector((state: RootState) => state.googleDirectionServicesReducers)

    const containerStyle = {
        width: "100%",
        height: "100%",
        flexGrow: "1"
    }

    // const renderGogosKimironkoBusStops = () => kigaliKimironkoBusStops.map((stopStation, index) => (
    //     <MarkerF key={index} position={stopStation.position} label={stopStation.name} />
    // ));

    // start moviingwith the vehicle
    useEffect(() => {
        if (driverSpeed && isDriving && googleDirectionServiceResults) {
            // we start moving the MarkerF by speed in m/s

        }

    }, [isDriving, driverSpeed]);

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={kigaliKimironkoBusStops[0].position}
            zoom={15}
            onLoad={(mapInstance: google.maps.Map) => setMap(mapInstance)}
        // onUnmount={onUnmount}
        >
            {/* {renderGogosKimironkoBusStops()} */}
            <MarkerF
                position={kigaliKimironkoBusStops[0].position}
                label={kigaliKimironkoBusStops[0].name}
                icon={googleMapMarkerIcon}
            />
            {googleDirectionServiceResults && <DirectionsRenderer directions={googleDirectionServiceResults} />}
        </GoogleMap>
    )

}

export default GoogleMapComponent