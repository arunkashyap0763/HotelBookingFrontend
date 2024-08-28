// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HotelList from './components/HotelList';
import LoginPage from './components/LoginPage';


function App() {
  return (
    <Router>
            <Routes>
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Hotel" element={<HotelList />} />
            </Routes>
        </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //   <HotelList></HotelList>
    // </div>
  );
}

export default App;
