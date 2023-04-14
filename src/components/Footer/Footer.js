import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <h2 className="footer-text">
                This Social Media Project was made by <b>Matey Nikolov</b> only for Educational Purpose.
                Contact me on <Link to="https://www.facebook.com/mnikolov92/">Facebook</Link>
            </h2>
        </div>
    );
};

export default Footer;