import React, { useEffect, useState } from "react";
import {
  getProfile,
  postAddItem,
  putEditProfile,
  putRestPassword,
} from "../../serviceApis/loginapi";
import { useAuth } from "../../context/AuthProvider";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import {
  Navbar,
  Offcanvas,
  Nav,
  Container,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaPlus, FaUser, FaLock, FaSignOutAlt } from "react-icons/fa"; // Import icons
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.scss";
import FarmNotesLogo from "../../assets/FarmNotes.png"; // Adjust the path as needed
import Sidebar from "../../components/sidebar";
import ItemList from "../../components/farm-items-display/farm-items-display";
import AddItemModal from "../../components/add-item-modal/add-item-modal"; // Adjust the path as needed
import EditProfileModal from "../../components/edit-profile.modal";
import ResetPasswordModal from "../../components/reset-password";

const Dashboard = () => {
  const { logout } = useAuth();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleProfileModalClose = () => setShowProfileModal(false);
  const handleProfileModalShow = () => setShowProfileModal(true);
  const handleSecurityModalClose = () => setShowSecurityModal(false);
  const handleSecurityModalShow = () => setShowSecurityModal(true);

  const handleProfile = async () => {
    try {
      const userData = await getProfile();
      setProfile(userData);
      console.log("userData->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleAddItem = async (item) => {
    try {
      const response = await postAddItem(item);
      console.log(response);
      setShowModal(false);
      // fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleSaveProfile = async (profileData) => {
    try {
      const response = await putEditProfile({
        userName: profileData.userName, // Corrected typo here
        phoneNumber: profileData.phoneNumber,
        dateOfBirth: profileData.dateOfBirth,
        address: profileData.address,
        country: profileData.country,
        pinCode: profileData.pinCode,
      });
      console.log(response);
      // handleOffcanvasClose();
      await handleProfile(); // Fetch the updated profile data
      setShowProfileModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleRestPassword = async (profileData) => {
    try {
      const response = await putRestPassword({
        email: profile?.email,
        password: profileData?.password,
        confirmPassword: profileData?.confirmPassword,
      });
      console.log(response);
      handleOffcanvasClose();
      await handleProfile();
      setShowSecurityModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
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
          <Button
            variant="success"
            className="ms-auto add-item-button"
            onClick={handleModalShow}
          >
            <FaPlus className="me-2" /> Add Farm Item
          </Button>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={handleOffcanvasShow}
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={showOffcanvas}
            onHide={handleOffcanvasClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-column">
                <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip id="tooltip-profile">Profile</Tooltip>}
                >
                  <Nav.Link
                    as={Link}
                    to="#"
                    className="nav-link"
                    onClick={() => {
                      handleProfileModalShow();
                    }}
                  >
                    <FaUser className="me-2" /> Profile
                  </Nav.Link>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip id="tooltip-security">Security</Tooltip>}
                >
                  <Nav.Link
                    as={Link}
                    to="#"
                    className="nav-link"
                    onClick={() => {
                      handleSecurityModalShow();
                    }}
                  >
                    <FaLock className="me-2" /> Security
                  </Nav.Link>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip id="tooltip-logout">Logout</Tooltip>}
                >
                  <Nav.Link
                    as={Link}
                    to="/"
                    className="nav-link"
                    onClick={() => {
                      handleOffcanvasClose();
                      logout();
                    }}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </Nav.Link>
                </OverlayTrigger>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <AddItemModal
        show={showModal}
        handleClose={handleModalClose}
        handleAddItem={handleAddItem}
      />
      <EditProfileModal
        show={showProfileModal}
        handleClose={handleProfileModalClose}
        profile={profile}
        handleSave={handleSaveProfile}
      />
      <ResetPasswordModal
        show={showSecurityModal}
        handleClose={handleSecurityModalClose}
        profile={profile}
        handleSave={handleRestPassword}
      />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route index element={<Navigate to="items" />} />
            <Route path="items" element={<ItemList />} />
            <Route path="animals" element={<ItemList id="1" key="animals" />} />
            <Route path="crops" element={<ItemList id="2" key="crops" />} />
            <Route path="aquatic" element={<ItemList id="3" key="aquatic" />} />
            <Route path="poultry" element={<ItemList id="4" key="poultry" />} />
            <Route path="pets" element={<ItemList id="5" key="pets" />} />
            <Route
              path="machinery"
              element={<ItemList id="6" key="machinery" />}
            />
            <Route
              path="infrastructure"
              element={<ItemList id="7" key="infrastructure" />}
            />
            <Route
              path="supplies"
              element={<ItemList id="8" key="supplies" />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
