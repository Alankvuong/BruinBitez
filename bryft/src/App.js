import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import RidePost from './components/RidePost'

function App() {
  return (
    <div>
      <RidePost />
    </div>
  );
}

export default App;
