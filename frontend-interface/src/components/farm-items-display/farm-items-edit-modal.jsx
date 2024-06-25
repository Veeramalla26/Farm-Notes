import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "../add-item-modal/add-item-modal.scss";
import { getCategories, putEditItem } from "../../serviceApis/loginapi";

const EditModal = ({ show, handleClose, selectedItem, fetchItems }) => {
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setEditName(selectedItem.name);
      setEditCategory(selectedItem.Category?.id || "");
    }
  }, [selectedItem]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories(); // Replace with your API endpoint for categories
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEditItem = async () => {
    if (!editName || !editCategory) {
      setError("Please fill out both fields.");
      return;
    }

    try {
      await putEditItem(selectedItem.id, {
        name: editName,
        categoryId: editCategory,
      }); // Replace with your edit API endpoint
      fetchItems(); // Refresh items after edit
      handleClose();
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Farm Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="editItemName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Enter item name"
          />
        </Form.Group>
        <Form.Group controlId="editItemCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          >
            <option value="">Select category...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          className="close-button"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleEditItem}
          className="add-item-button"
        >
          Edit Farm Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
