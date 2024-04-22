import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';


const GoogleMapComponent = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    })

    //show loading spinner
    if (!isLoaded) return <LoadingSpinner />

    return (
        <div>
            google map
        </div>
    )

}

export default GoogleMapComponent