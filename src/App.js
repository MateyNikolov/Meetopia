import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';


import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Catalogue from './components/Catalogue/Catalogue';
import Myposts from './components/Myposts/Myposts';
import Create from './components/Create/Create';
import Logout from './components/Logout/Logout';

import { CloudinaryContext } from 'cloudinary-react';
import { cloudinaryData } from './cloudinaryConfig';



function App() {

    return (
        <AuthProvider>
            <div id="body">

                <Header />

                <main>
                    <CloudinaryContext
                        cloudName={[cloudinaryData.cloudName]}
                        apiKey={[cloudinaryData.apiKey]}
                        apiSecret={[cloudinaryData.apiSecret]}>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/feed' element={<Catalogue />} />
                            <Route path='/my-posts' element={<Myposts />} />
                            <Route path='/new' element={<Create />} />
                            <Route path='/logout' element={<Logout />} />
                        </Routes>
                    </CloudinaryContext>
                </main>

                <Footer />

            </div>
        </AuthProvider >
    );
}

export default App;
