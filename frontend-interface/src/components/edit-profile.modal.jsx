import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../components/add-item-modal/add-item-modal.scss";

const formatDateToInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EditProfileModal = ({ show, handleClose, profile, handleSave }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    dateOfBirth: "",
    country: "",
    phoneNumber: "",
    pinCode: "",
    address: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile) {
      setFormData({
        userName: profile.userName || "",
        email: profile.email || "",
        dateOfBirth: formatDateToInput(profile.dateOfBirth) || "",
        country: profile.country || "",
        phoneNumber: profile.phoneNumber || "",
        pinCode: profile.pinCode || "",
        address: profile.address || "",
        role: profile.role || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Numeric-only validation for pinCode
    if (name === "pinCode") {
      if (value.trim() === "" || /^\d+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pinCode: "Zip code must be a number",
        }));
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = "User Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.address) newErrors.address = "Address is required";

    // Pin code validation
    if (!formData.pinCode) {
      newErrors.pinCode = "Zip code is required";
    } else if (!/^\d+$/.test(formData.pinCode)) {
      newErrors.pinCode = "Zip code must be a number";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      handleSave(formData);
    } else {
      setErrors(formErrors);
    }
  };

  const handleModalClose = () => {
    setErrors({});
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form>
          <div className="form-row">
            <Form.Group
              controlId="formUserName"
              className="form-group half-width"
            >
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter user name"
                required
                isInvalid={!!errors.userName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.userName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail" className="form-group half-width">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                required
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="form-row">
            <Form.Group
              controlId="formDateOfBirth"
              className="form-group half-width"
            >
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                isInvalid={!!errors.dateOfBirth}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfBirth}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              controlId="formCountry"
              className="form-group half-width"
            >
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter country"
                required
                isInvalid={!!errors.country}
              />
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="form-row">
            <Form.Group
              controlId="formPhoneNumber"
              className="form-group half-width"
            >
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              controlId="formPinCode"
              className="form-group half-width"
            >
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                placeholder="Enter Zip code"
                required
                isInvalid={!!errors.pinCode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pinCode}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Form.Group controlId="formAddress" className="form-group">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formRole" className="form-group">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleModalClose}
          className="close-button"
        >
          Close
        </Button>
        <Button onClick={handleSubmit} className="add-item-button">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
