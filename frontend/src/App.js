import './App.scss';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavList from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cakes from './pages/Cakes';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Purchases from './pages/Purchases';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
        <NavList/>
       <main>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="torta" element={<Cakes />} />
        <Route path="regisztracio" element={<Register />} />
        <Route path="bejelentkezes" element={<Login />} />
        <Route path="profil" element={<Profile />} />
        <Route path="kosar" element={<Cart />} />
        <Route path="rendelesek" element={<Purchases />} />
        <Route path="kapcsolat" element={<Contact />} />
      </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
