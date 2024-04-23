import { useState } from 'react';
import FormMapData from '../../components/formMapData/FormMapData';
import GoogleMapComponent from '../../components/googleMap/GoogleMap';
import MapForm from '../../components/mapForm/MapForm';
import styles from './home.module.scss';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import { useJsApiLoader } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


const Home = () => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const { googleDirectionServiceResults } = useSelector((state: RootState) => state.googleDirectionServicesReducers)

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
                {googleDirectionServiceResults ?
                    <FormMapData map={map} /> :
                    <MapForm />
                }
                <GoogleMapComponent setMap={setMap} />
            </div>
        </div>
    )
}
export default Home;