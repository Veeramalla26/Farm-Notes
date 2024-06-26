import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { getCategories } from "../../serviceApis/loginapi";
import "./add-item-modal.scss";

const AddItemModal = ({ show, handleClose, handleAddItem }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [species, setSpecies] = useState("");
  const [date, setDate] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [feedingSchedule, setFeedingSchedule] = useState("");
  const [errors, setErrors] = useState({});

  const handleProfile = async () => {
    try {
      const userData = await getCategories();
      setCategories(userData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!category) newErrors.category = "Category is required";
    if (!itemCode) newErrors.itemCode = "Item Code is required";
    // Add validation for other required fields here if needed
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const itemData = {
        name: name || null,
        categoryId: category || null,
        itemCode: itemCode || null,
        species: species || null,
        dateOfBirth: date || null,
        healthStatus: healthStatus || null,
        feedingSchedule: feedingSchedule || null,
      };
      handleAddItem(itemData);
      setName("");
      setCategory("");
      setItemCode("");
      setSpecies("");
      setDate("");
      setHealthStatus("");
      setFeedingSchedule("");
      setErrors({});
      handleClose();
    }
  };

  const handleModalClose = () => {
    setName("");
    setCategory("");
    setItemCode("");
    setSpecies("");
    setDate("");
    setHealthStatus("");
    setFeedingSchedule("");
    setErrors({});
    handleClose();
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.id]: undefined,
    }));
  };

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form>
          <div className="form-row">
            <Form.Group controlId="name" className="form-group half-width">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                value={name}
                onChange={handleInputChange(setName)}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                required
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </Form.Group>
            <Form.Group controlId="itemCode" className="form-group half-width">
              <Form.Label>Item Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item code"
                value={itemCode}
                onChange={handleInputChange(setItemCode)}
                className={`form-control ${
                  errors.itemCode ? "is-invalid" : ""
                }`}
                required
              />
              {errors.itemCode && (
                <div className="text-danger">{errors.itemCode}</div>
              )}
            </Form.Group>
          </div>
          <div className="form-row">
            <Form.Group
              controlId="categoryId"
              className="form-group half-width"
            >
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={handleInputChange(setCategory)}
                className={`form-control ${
                  errors.category ? "is-invalid" : ""
                }`}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Control>
              {errors.category && (
                <div className="text-danger">{errors.category}</div>
              )}
            </Form.Group>
            <Form.Group controlId="species" className="form-group half-width">
              <Form.Label>Species</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter species"
                value={species}
                onChange={handleInputChange(setSpecies)}
                className="form-control"
              />
            </Form.Group>
          </div>
          <div className="form-row">
            <Form.Group controlId="date" className="form-group half-width">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={handleInputChange(setDate)}
                className="form-control"
              />
            </Form.Group>
            <Form.Group
              controlId="healthStatus"
              className="form-group half-width"
            >
              <Form.Label>Health Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter health status"
                value={healthStatus}
                onChange={handleInputChange(setHealthStatus)}
                className="form-control"
              />
            </Form.Group>
          </div>
          <Form.Group controlId="feedingSchedule" className="form-group">
            <Form.Label>Feeding Schedule</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter feeding schedule"
              value={feedingSchedule}
              onChange={handleInputChange(setFeedingSchedule)}
              className="form-control"
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
        <Button
          variant="success"
          onClick={handleSubmit}
          className="add-item-button"
        >
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemModal;
