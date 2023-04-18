import { Link } from 'react-router-dom';
import './Home.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div className="home-heading">
            <img className="heading-img" src="imgs/heading.png" alt="heading" />
            <div className='heading-texts'>
                <h1 className="heading-text">Bringing the world closer...</h1>
                {!isAuthenticated() ?
                    (<Link to="/login">
                        <h2 className='heading-second'>Connect now</h2>
                    </Link>)
                    : <Link to="/posts">
                        <h2 className='heading-second'>Start your trip</h2>
                    </Link>}
            </div>
        </div>
    )
}

export default Home;