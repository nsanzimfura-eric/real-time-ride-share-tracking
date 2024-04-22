import { GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { googleMapCenter } from '../../utils/constants';
import { PlacesDataInterface } from '../../pages/home/Home';
import { MapFormProps } from '../mapForm/MapForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { googleMapMarkerIcon } from '../../utils/googleMapMarkerIcon';

export interface MapProps extends MapFormProps {
    map: google.maps.Map | null;
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
    placesData: PlacesDataInterface;
}

const GoogleMapComponent = (props: MapProps) => {
    const { map, setMap } = props;
    const { googleDirectionServiceResults } = useSelector((state: RootState) => state.googleDirectionServicesReducers)

    console.log(map)
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