import React, { useEffect, useState } from "react";
import { getProfile } from "../../serviceApis/loginapi";
import { useAuth } from "../../context/AuthProvider";
import { Link, Route, Routes } from "react-router-dom";
import { Navbar, Offcanvas, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.scss';
import FarmNotesLogo from '../../assets/FarmNotes.png'; // Adjust the path as needed

const Dashboard = () => {
  const { logout } = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProfile = async () => {
    try {
      const userData = await getProfile();
      console.log("userData->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <div className="dashboard">
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={FarmNotesLogo} alt="FarmNotes Logo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/profile" onClick={handleClose}>Profile</Nav.Link>
                <Nav.Link as={Link} to="/security" onClick={handleClose}>Security</Nav.Link>
                <Nav.Link as={Link} to="/" onClick={() => { handleClose(); logout(); }}>Logout</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <div className="content">
        <main className="main-content">
          <Routes>
            <Route path="/profile" element={<div>Profile Component</div>} />
            <Route path="/security" element={<div>Security Component</div>} />
            <Route path="/category/:category" element={<div>Farm Thing Component</div>} />
            <Route path="/" element={<h1>Welcome to the FarmNote Dashboard</h1>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
