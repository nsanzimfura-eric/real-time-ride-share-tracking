import { Container } from 'react-bootstrap';
import styles from './formMapaData.module.scss';

const FormMapData = () => {

    return (
        <Container className={styles.formMapData}>
            <div className='wrapperData d-flex flex-column'>
                <div className='d-flex align-items-center'>
                    <h3>Nyabugogo</h3>
                    <span>-</span>
                    <h3>Kimironko</h3>
                </div>
                <span > Next stop: Kakiru</span>
                <div className='d-flex'>
                    <span > Distance: 23KM</span>
                    <span > Time: 23minutes</span>
                </div>
                <div className='d-flex justify-content-center align-items-center w-100 mt-3'><button className='btn'>Cancel</button></div>
            </div>
        </Container>
    );
};

export default FormMapData;