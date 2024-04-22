import { useState } from 'react';
import FormMapData from '../../components/formMapData/FormMapData';
import GoogleMapComponent from '../../components/googleMap/GoogleMap';
import MapForm from '../../components/mapForm/MapForm';
import styles from './home.module.scss';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import { useJsApiLoader } from '@react-google-maps/api';


export interface PlacesDataInterface {
    origin: string;
    destination: string;
}

export const initialMapState = {
    origin: "",
    destination: ""
}
const Home = () => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [placesData, setPlacesData] = useState<PlacesDataInterface>(initialMapState);

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
                {/* if we have new places data we hide form and show map data */}
                {!placesData.destination && !placesData.origin ?
                    <MapForm map={map} setMap={setMap} setPlacesData={setPlacesData} /> :
                    <FormMapData map={map} setMap={setMap} setPlacesData={setPlacesData} placesData={placesData} />
                }
                <GoogleMapComponent map={map} setMap={setMap} setPlacesData={setPlacesData} placesData={placesData} />
            </div>
        </div>
    )
}
export default Home;