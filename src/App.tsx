import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArtworkCard from './pages/ArtworkCard';
import Favorites from './pages/Favorites';
import { ROUTES } from './consts/routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          {ROUTES.map((route, id) => (
            <Route key={id} path={route.path} element={<route.element />} />
          ))}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
