import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Footer from './components/Footer.js'
import About from './components/About.js'
import Signin from './components/Signin.js'
import Callback from './components/Callback.js'
import ReadMe from './components/ReadMe.js'
import Output from './components/Output.js'
import Form from './components/Form.js'
import Home from './components/Home.js'
import Reverse from './components/Reverse.js'
import './styles/LandingPage.scss'


const App = () => {
  return (
    <div className = "app">
      <Router>
        <div className="contentWrapper">
          <Routes>
             <Route path="/home" exact element={<Home />}/>
          <Route path="/form" element={<Signin />} />
          <Route path="/callback" element={<Callback />} />
         
            <Route path="/reverse" exact element={<Reverse />}/>
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