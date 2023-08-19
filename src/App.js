import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import NewRegistration from './components/NewRegistration';
import Users from './components/Users';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* <Route path='/users' element={<Users/>} /> */}
        <Route path='/new-registration' element={<NewRegistration/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
