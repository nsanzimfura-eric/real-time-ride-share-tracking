import { GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { googleMapCenter } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { googleMapMarkerIcon } from '../../utils/googleMapMarkerIcon';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { PlacesDataInterface } from '../../pages/home/Home';
import { kigaliKimironkoBusStops } from '../../utils/routeStopsData';
import { useEffect } from 'react';
import { setGoogleDirectionServices } from '../formMapData/GoogleMapDataSlice';

export interface MapProps {
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
    placesData: PlacesDataInterface;
}

const GoogleMapComponent = (props: MapProps) => {
    const { setMap, placesData } = props;
    const { googleDirectionServiceResults } = useSelector((state: RootState) => state.googleDirectionServicesReducers)
    const currentLocation = useCurrentLocation();
    const dispatch = useDispatch()

    const containerStyle = {
        width: "100%",
        height: "100%",
        flexGrow: "1"
    }

    const renderGogosKimironkoBusStops = () => kigaliKimironkoBusStops.map((stopStation, index) => (
        <MarkerF key={index} position={stopStation.position} label={stopStation.name} />
    ));

    const getNextStopETA = async (origin: google.maps.LatLng, destination: google.maps.LatLngLiteral) => {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route({
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result) {
                dispatchEvent
                const eta = result?.routes[0]?.legs[0] || '';
                console.log("ETA to next stop:", eta);
                dispatch(setGoogleDirectionServices(JSON.stringify(result)));
            }
        });
    };

    useEffect(() => {
        if (currentLocation) {
            getNextStopETA(currentLocation, kigaliKimironkoBusStops[0].position);
        }
    }, [currentLocation]);


    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={googleMapCenter}
            zoom={15}
            onLoad={(mapInstance: google.maps.Map) => setMap(mapInstance)}
        // onUnmount={onUnmount}
        >
            {renderGogosKimironkoBusStops()}
            <MarkerF
                position={placesData.destination && placesData.origin && currentLocation ? currentLocation : googleMapCenter}
                icon={googleMapMarkerIcon}
            />
            {googleDirectionServiceResults && <DirectionsRenderer directions={googleDirectionServiceResults} />}
        </GoogleMap>
    )

}

export default GoogleMapComponent