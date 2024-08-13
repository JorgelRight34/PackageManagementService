import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const MyNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img src="/logo.svg" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          Servicio de Gestión de Paquetes
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/paquetes">Paquetes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/envios">Envios</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/estados">Estados</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  };
  
  export default MyNavbar;
  