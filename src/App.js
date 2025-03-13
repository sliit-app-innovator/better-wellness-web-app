import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menubar/MenuBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home/>} />
        {/*  <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
