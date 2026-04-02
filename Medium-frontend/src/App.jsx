import React from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Mid from './Mid';
import ViewArticles from './ViewArticles';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header className="header" />

      <Routes>
        <Route path="/" element={<Mid />} />
        <Route path="/viewAll" element={<ViewArticles />} />
      </Routes>

      <Footer className="footer" />
    </div>
  );
}

export default App;