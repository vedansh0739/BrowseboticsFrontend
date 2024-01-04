
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React,{useEffect} from 'react';

import './App.css'


import Base from './Base'
import Temp from './Temp'
const App: React.FC = () => {
  useEffect(() => {
    document.title = 'BrowseBotics';
  }, []); 
  return(
    <Router>
    <Routes>
      <Route path="/" element={<Base />}/>
      <Route path="/temp" element={<Temp />}/>
    </Routes>
    </Router>
  );
}



export default App
