import { Container } from 'react-bootstrap';
import styles from './formMapaData.module.scss';
import { MapProps } from '../googleMap/GoogleMap';
import { googleMapCenter } from '../../utils/constants';
import { initialMapState } from '../../pages/home/Home';


const FormMapData = (props: MapProps) => {
    const { map, setMap, placesData, setPlacesData } = props;

    const handleSetMapBack = () => {
        setPlacesData(initialMapState);
        map?.panTo(googleMapCenter);
    }

    return (
        <Container className={styles.formMapData}>
            <div className='wrapperData d-flex flex-column'>
                <div className='d-flex align-items-center'>
                    <h3>{placesData?.origin}</h3>
                    <span>-</span>
                    <h3>{placesData?.destination}</h3>
                </div>
                <span > Next stop: Kakiru</span>
                <div className='d-flex'>
                    <span > Distance: 23KM</span>
                    <span > Time: 23minutes</span>
                </div>
                <div className='d-flex justify-content-center align-items-center w-100 mt-3'><button className='btn' onClick={handleSetMapBack}>Cancel</button></div>
            </div>
        </Container>
    );
};

export default FormMapData;