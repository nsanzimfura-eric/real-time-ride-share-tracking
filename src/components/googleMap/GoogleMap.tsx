import { GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { googleMapCenter } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { googleMapMarkerIcon } from '../../utils/googleMapMarkerIcon';

export interface MapProps {
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
}

const GoogleMapComponent = (props: MapProps) => {
    const { setMap } = props;
    const { googleDirectionServiceResults } = useSelector((state: RootState) => state.googleDirectionServicesReducers)

    // const styles
    const containerStyle = {
        width: "100%",
        height: "100%",
        flexGrow: "1"
    }


    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={googleMapCenter}
            zoom={15}
            onLoad={(mapInstance: google.maps.Map) => setMap(mapInstance)}
        // onUnmount={onUnmount}
        >
            <MarkerF
                position={googleMapCenter}
                icon={googleMapMarkerIcon}
            />
            {googleDirectionServiceResults && <DirectionsRenderer directions={googleDirectionServiceResults} />}
        </GoogleMap>
    )

}

export default GoogleMapComponent