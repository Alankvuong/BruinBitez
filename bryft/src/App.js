import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage";
import RidesPage from "./pages/RidesPage/RidesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        {/* <Route exact path="/about" element={<AboutPage/>} /> */}
        {/* <Route exact path="/login" element={<LoginPage/>} /> */}
        <Route exact path="/rides" element={<RidesPage/>} />
      </Routes>
    </Router>
  // <div>
  //     hi
  // </div>
  );
}

export default App;
