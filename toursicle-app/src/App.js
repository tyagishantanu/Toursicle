import { useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from './pages/Main/Main.js';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp';
import Header from './components/Header/Header'
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authslice';
import AddUpdateStory from './pages/AddUpdateStory/AddUpdateStory';
import SingleStory from './pages/SingleStory/SingleStory';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRouting/PrivateRoute';
import NotFound from './pages/NotFound/NotFound';
import TagStories from './pages/TagStories/TagStories';
import Footer from './components/Footer/Footer';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/stories/search" element={<Main/>} />
            <Route path="/stories/tag/:tag" element={<TagStories/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/addStory" element={<PrivateRoute><AddUpdateStory/></PrivateRoute>} />
            <Route path="/updateStory/:id" element={<PrivateRoute><AddUpdateStory/></PrivateRoute>} />
            <Route path="/story/:id" element={<SingleStory/>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} /> 
            <Route path="*" element={<NotFound />} /> 
          </Routes>
          <div className='foot-style'>
          <Footer />
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
