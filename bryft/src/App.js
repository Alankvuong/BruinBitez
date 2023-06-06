import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Navbar/ProtectedNav';
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import DriverProfile from './pages/DriverProfilePage/DriverProfile';
import UserProfile from './pages/UserProfilePage/UserProfile';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/about" element={<AboutPage/>} />
          {/* <Route exact path="/login" element={<LoginPage/>} /> */}
          {/* <Route exact path="/rides" element={<RidesPage/>} /> */}
          <Route exact path="/driver-profile" element={<DriverProfile/>} />
          <Route exact path="/user-profile" element={<Protected><UserProfile/></Protected>} />
        </Routes>
      </Router>
    </AuthContextProvider>
  // <div>
  //     hi
  // </div>
  );
}

export default App;
