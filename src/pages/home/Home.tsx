import FormMapData from '../../components/formMapData/FormMapData';
import GoogleMapComponent from '../../components/googleMap/GoogleMap';
import MapForm from '../../components/mapForm/MapForm';
import styles from './home.module.scss';

const Home = () => {
    return (
        <div className={styles.home}>
            <div className='googleMapWrapper position-absolute bg-none'>
                {/* <MapForm /> */}
                <FormMapData />
                <GoogleMapComponent />
            </div>
        </div>
    )
}
export default Home;