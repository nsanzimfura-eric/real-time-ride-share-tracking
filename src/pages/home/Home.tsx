import GoogleMapComponent from '../../components/googleMap/GoogleMap';
import styles from './home.module.scss';

const Home = () => {
    return (
        <div className={styles.home}>
            <div className='googleMapWrapper position-absolute bg-none'>
                <GoogleMapComponent />
            </div>
        </div>
    )
}
export default Home;