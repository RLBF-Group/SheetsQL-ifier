import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Footer from './components/Footer.js'
import About from './components/About.js'
import ReadMe from './components/ReadMe.js'
import Output from './components/Output.js'
import Form from './components/Form.js'
import './styles/LandingPage.scss'


const App = () => {
  return (
    <div className = "app">
      <Router>
        <div className="contentWrapper">
          <Routes>
            <Route path="/" exact element={<Form />}/>
            <Route path="/readme" exact element={<ReadMe />}/>
            <Route path="/about" exact element={<About />}/>
            <Route path="/output" exact element={<Output />}/>
            {/* <Route path="/form" exact element={<Form />}/> */}
          </Routes>
        <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App