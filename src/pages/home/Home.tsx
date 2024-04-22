import { useState } from 'react';
import FormMapData from '../../components/formMapData/FormMapData';
import GoogleMapComponent from '../../components/googleMap/GoogleMap';
import MapForm from '../../components/mapForm/MapForm';
import styles from './home.module.scss';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import { useJsApiLoader } from '@react-google-maps/api';
import { initialGoogleMapState } from '../../utils/constants';


export interface PlacesDataInterface {
    origin: string;
    destination: string;
}


const Home = () => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [placesData, setPlacesData] = useState<PlacesDataInterface>(initialGoogleMapState);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
    })

    //show loading spinner
    if (!isLoaded) return <LoadingSpinner />


    return isLoaded && (
        <div className={styles.home}>
            <div className='googleMapWrapper position-absolute bg-none'>
                {/* if we have new places data we hide form and show Google map data */}
                {placesData.destination && placesData.origin ?
                    <FormMapData map={map} setPlacesData={setPlacesData} placesData={placesData} /> :
                    <MapForm setPlacesData={setPlacesData} />
                }
                <GoogleMapComponent setMap={setMap} placesData={placesData} />
            </div>
        </div>
    )
}
export default Home;