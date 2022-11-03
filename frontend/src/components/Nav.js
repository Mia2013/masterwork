import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useLoggedInUserContext } from './LoggedInUserContextProvider';

export default function NavList() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUserContext();

  return (
    <Navbar
      expand="sm"
      collapseOnSelect
      variant="dark"
      className="nav d-flex align-items-start"
      fixed="top"
    >
      <Container fluid >
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ps-3">
            <Nav.Link href="/">Kezdőlap</Nav.Link>
            <Nav.Link href="torta">Torták</Nav.Link>
            {loggedInUser.userId ?             
            (<>
            <Nav.Link href="kosar">Kosár</Nav.Link>
            <Nav.Link href="rendelesek">Rendelések</Nav.Link>
            <Nav.Link href="kapcsolat">Kapcsolat</Nav.Link> 
            <Nav.Link href="profil">Profil</Nav.Link>

            <Nav.Link href="/" onClick={()=>{
            setLoggedInUser({});
            localStorage.removeItem('cakeWorldToken');
            }}>Kijeletkezés</Nav.Link>
            </>)
            :     
            (<>
              <Nav.Link href="regisztracio">Regisztráció</Nav.Link>
              <Nav.Link href="bejelentkezes">Bejeletkezés</Nav.Link> 
              <Nav.Link href="kapcsolat">Kapcsolat</Nav.Link> 

              </>)  
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
