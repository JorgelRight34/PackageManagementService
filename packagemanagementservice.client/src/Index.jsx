import { useEffect, useState } from 'react';
import './index.css';


function Index() {
  return (
    <>
      <div id="header">
        <img id="logo" src="/logo.svg"/>
        <h1>Servicio de Gestión de Paquetes</h1>
        <p>por <strong>Pablo Lorenzo</strong>: frontend y <strong>Jorge Lorenzo</strong>: backend.</p>
      </div>

      <div id="options">
        <div>

          <a href="/paquetes">
            <button type='button'>Paquetes</button>
          </a>

        </div>
        <div>
          <a href="/envios">
            <button type='button'>Envios</button>
          </a>
        </div>
        <div>
          <a href="estados">
            <button type='button'>Estados</button>
          </a>
        </div>
      </div>
      
    </>
  );
}

export default Index;
