import { Container } from 'react-bootstrap';
import styles from './mapForm.module.scss'

const MapForm = () => {

    return (
        <Container className={styles.mapForm}>
            <form className='formWrapper bg-none'>
                <input type="text" required placeholder='Origin' />
                <input type="text" required placeholder='Destination' />
                <button type='submit'>Start</button>
            </form>
        </Container>
    );
};

export default MapForm;