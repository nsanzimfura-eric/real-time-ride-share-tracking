import styles from './footer.module.scss'

const Footer = () => {

    const year = new Date().getFullYear();
    return (
        <footer className={`${styles.footer} w-100 m-0`}>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className='d-flex w-100'>
                    <img src="/icons/heart.svg" alt="Icon" />
                    <img src="/icons/important.svg" alt="Icon" />
                    <img src="/icons/bell.svg" alt="Icon" />
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-white sm:text-center">© {year} <a href="https://nsanzimfura.web.app/" className="hover:underline">Ride Share Tracker™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;