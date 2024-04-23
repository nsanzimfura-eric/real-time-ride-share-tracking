import styles from './navbar.module.scss'
import { Container, Navbar as NavbarBootstrap, Nav } from 'react-bootstrap';

const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Free Drivers', href: '#', current: false },
    { name: 'Book a Driver', href: '#', current: false },
]

const Navbar = () => {

    return (
        <NavbarBootstrap expand="md" className={styles.navbar}>
            <Container>
                <NavbarBootstrap.Brand href="#home" className='d-none d-md-block'>
                    <img src="/icons/logo.png" alt="Logo" className='logo' />
                </NavbarBootstrap.Brand>
                <div className='d-flex justify-content-between w-100 align-items-center'>
                    <NavbarBootstrap.Toggle aria-controls="basic-NavbarBootstrap-nav" />
                    <p className='d-flex d-md-none my-auto startUp'>StartUp</p>
                </div>
                <NavbarBootstrap.Collapse id="basic-navbar-nav mt-5 mt-sm-0" className='linksWrapper'>
                    <Nav className="ms-auto links d-flex">
                        {navigation.map((item) => (
                            <Nav.Link key={item.name} href={item.href} className={item.current ? ' link activeLink' : 'link'}>
                                {item.name}
                            </Nav.Link>
                        ))}
                    </Nav>
                </NavbarBootstrap.Collapse>
            </Container>
        </NavbarBootstrap>
    );
};

export default Navbar;