import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';


const GoogleMapComponent = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    })

    //show loading spinner
    if (!isLoaded) return <LoadingSpinner />

    // kigali center
    const googleMapCenter = {
        lat: -1.9538216736362783,
        lng: 30.092569559416436,
    }
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
            zoom={10}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
        >
            <Marker
                position={googleMapCenter}
                icon={icon} // Apply custom icon
            />
        </GoogleMap>
    )

}

export default GoogleMapComponent