import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext';
import { useContext } from 'react';
import './Header.css';

const Header = () => {
    const { isAuthenticated, auth } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <div className="logo">
                    <Link to="/">
                        <img className="logo-img" src="/imgs/logo.png" alt="logo" />
                    </Link>
                    <span >
                        <Link to="/" className='logo-txt'>Meetopia</Link>
                    </span>
                </div>
                <ul>
                    <li>
                        <Link to="/posts">
                            Feed
                        </Link>
                    </li>
                    <>
                        {isAuthenticated() ? (
                            <>
                                <li>
                                    <Link to="/my-posts">
                                        My Posts
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/new">
                                        New Post
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/logout">
                                        Sign Out
                                    </Link>
                                </li>
                                <div className="profile-box">
                                    <Link to="/profile">
                                        Profile
                                    </Link>
                                    <Link to="/profile">
                                        <img
                                            className="profile-img"
                                            src={!auth.picture ? ("/imgs/profile.png") : (auth.picture)}
                                            alt="profile picture"
                                        />
                                    </Link>
                                </div>
                            </>
                        )
                            :
                            (
                                <>
                                    <li>
                                        <Link to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </>
                </ul>
            </nav>
        </header>
    );
};

export default Header;