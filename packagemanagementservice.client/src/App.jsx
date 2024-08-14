import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Paquetes from './Components/PaquetesComponents/Paquetes.jsx';
import Envios from './Components/EnviosComponents/Envios.jsx';
import Estados from './Components/EstadosComponents/Estados.jsx';
import Index from './Index.jsx';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />}></Route>
                <Route path="/paquetes" element={<Paquetes />}></Route>
                <Route path="/envios" element={<Envios />}></Route>
                <Route path="/estados" element={<Estados />}></Route>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition: Bounce />
        </Router>
    )
}

export default App;
