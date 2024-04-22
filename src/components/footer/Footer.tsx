import styles from './footer.module.scss';
import { Container } from 'react-bootstrap';

const Footer = () => {

    const year = new Date().getFullYear();
    return (
        <footer className={`${styles.footer} w-100 m-0`}>
            <Container className="w-100 py-5 ">
                <div className='d-flex w-100 justify-content-between align-items-center'>
                    <img src="/icons/heart.svg" alt="Icon" />
                    <img src="/icons/important.svg" alt="Icon" />
                    <img src="/icons/bell.svg" alt="Icon" />
                </div>
                <hr className="my-3 line d-none d-md-block" />
                <span className="d-none d-md-flex justify-content-center align-items-center copyright">© {year} <a href="https://nsanzimfura.web.app/" >Ride Share Tracker.™</a> All Rights Reserved.</span>
            </Container>
        </footer>
    );
};

export default Footer;