import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from './components/LandingPage.js'
import Footer from './components/Footer.js'
import About from './components/About.js'
import ReadMe from './components/ReadMe.js'
import './styles/LandingPage.scss'


const App = () => {
  return (
    <div className = "app">
      <Router>
        <div className="contentWrapper">
          <Routes>
            <Route path="/" exact element={<LandingPage />}/>
            <Route path="/readme" exact element={<ReadMe />}/>
            <Route path="/about" exact element={<About />}/>
          </Routes>
        <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App