import styles from './loadingSpinner.module.scss'
import { Spinner } from 'react-bootstrap';



const LoadingSpinner = () => {

    return (
        <div className={styles.loadingSpinner}>
            <Spinner animation="border" variant="dark" />
        </div>
    );
};

export default LoadingSpinner;