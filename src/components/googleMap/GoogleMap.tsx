import { GoogleMap, Marker } from '@react-google-maps/api';
import { googleMapCenter } from '../../utils/constants';
import { PlacesDataInterface } from '../../pages/home/Home';
import { MapFormProps } from '../mapForm/MapForm';

export interface MapProps extends MapFormProps {
    map: google.maps.Map | null;
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
    placesData: PlacesDataInterface;
}

const GoogleMapComponent = (props: MapProps) => {
    const { map, setMap } = props;
    console.log(map)

    // const styles
    const containerStyle = {
        width: "100%",
        height: "100%",
        flexGrow: "1"
    }
    //marker Icon
    const icon = {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z",
        fillColor: '#95D273',
        fillOpacity: 1.0,
        strokeWeight: 1,
        strokeColor: '#8BD8DB',
        scale: 2,
        anchor: new google.maps.Point(12, 24)
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={googleMapCenter}
            zoom={15}
            onLoad={(mapInstance: google.maps.Map) => setMap(mapInstance)}
        // onUnmount={onUnmount}
        >
            <Marker
                position={googleMapCenter}
                icon={icon}
            />
        </GoogleMap>
    )

}

export default GoogleMapComponent