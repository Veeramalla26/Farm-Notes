import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import "./add-item-modal.scss";
import { getCategories } from "../../serviceApis/loginapi";

const AddItemModal = ({ show, handleClose, handleAddItem }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  console.log("categg", category);
  const [error, setError] = useState("");

  const handleProfile = async () => {
    try {
      const userData = await getCategories();
      console.log("userData->", userData);
      setCategories(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  const handleSubmit = () => {
    if (name && category) {
      handleAddItem({ name, categoryId: category });
      setName("");
      setCategory("");
      handleClose();
      setError("");
    } else {
      setError("Please fill out both fields.");
    }
  };

  const handleModalClose = () => {
    setName("");
    setCategory("");
    setError("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="itemName" className="form-group">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              style={{ color: "#000" }} // Black color for placeholder
              required
            />
          </Form.Group>
          <Form.Group controlId="itemCategory" className="form-group">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
              style={{ color: "#000" }} // Black color for placeholder
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
