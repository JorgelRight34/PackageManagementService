import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Paquetes from './Components/PaquetesComponents/Paquetes.jsx';
import Index from './Index.jsx';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />}></Route>
                <Route path="/paquetes" element={<Paquetes />}></Route>
            </Routes>
        </Router>
    )
}

export default App;
