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
import EditPost from './components/EditPost/EditPost';

import { CloudinaryContext } from 'cloudinary-react';
import PostDetails from './components/PostDetails/PostDetails';
import { RouteGuard } from './components/common/RouteGuard';





function App() {

    return (
        <AuthProvider>
            <div id="body">

                <Header />

                <main>
                    <CloudinaryContext cloudName="dj5j9cqc0">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/posts' element={<Catalogue />} />
                            <Route path='/posts/:postId' element={<PostDetails />} />
                            <Route element={<RouteGuard />}>
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/my-posts' element={<Myposts />} />
                                <Route path='/my-posts/:postId/edit' element={<EditPost />} />
                                <Route path='/new' element={<Create />} />
                                <Route path='/logout' element={<Logout />} />
                            </Route>
                        </Routes>
                    </CloudinaryContext>
                </main>

                <Footer />

            </div>
        </AuthProvider >
    );
}

export default App;
