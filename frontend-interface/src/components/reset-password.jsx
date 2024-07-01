import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../components/add-item-modal/add-item-modal.scss";
const ResetPasswordModal = ({ show, handleClose, handleSave, profile }) => {
  const [formData, setFormData] = useState({
    email: profile?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (show) {
      setFormData((prevFormData) => ({
        password: "",
        confirmPassword: "",
        email: profile?.email || "",
      }));
      setErrors({});
    }
  }, [show, profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      handleSave(formData);
      setFormSubmitted(true);
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleModalClose = () => {
    handleClose();
    if (!formSubmitted) {
      setFormData({
        email: profile?.email || "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
    setFormSubmitted(false);
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled
              required
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="form-group">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleModalClose}
          variant="secondary"
          className="close-button"
        >
          Close
        </Button>
        <Button onClick={handleSubmit} className="add-item-button">
          Reset Password
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPasswordModal;
