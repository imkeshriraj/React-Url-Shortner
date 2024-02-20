import './App.css';
import HomePage from './components/Home';
import Nav from './components/Nav';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import PrivateComponent from './components/PrivateComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' Component={Login}></Route>
          <Route path='/about' Component={About}></Route>
            <Route path='/contact' Component={Contact}></Route>
          <Route Component={PrivateComponent}>
            <Route path='/shorten-url' Component={HomePage}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
