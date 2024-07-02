import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getCategories, putEditItem } from "../../serviceApis/loginapi";
import "./farm-items-edit-modal.scss";

const EditModal = ({
  show,
  handleClose,
  selectedItem,
  fetchItems,
  dateOfBirth,
}) => {
  const [categories, setCategories] = useState([]);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editItemCode, setEditItemCode] = useState("");
  const [editSpecies, setEditSpecies] = useState("");
  const [editDate, setEditDate] = useState("");
  console.log("dd", editDate);
  const [editHealthStatus, setEditHealthStatus] = useState("");
  const [editFeedingSchedule, setEditFeedingSchedule] = useState("");
  const [errors, setErrors] = useState({});

  const formatDateToInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (selectedItem) {
      setEditName(selectedItem.name);
      setEditCategory(selectedItem.Category?.id || "");
      setEditItemCode(selectedItem.itemCode || "");
      setEditSpecies(selectedItem.species || "");
      setEditDate(formatDateToInput(selectedItem.dateOfBirth));
      setEditHealthStatus(selectedItem.healthStatus || "");
      setEditFeedingSchedule(selectedItem.feedingSchedule || "");
    }
  }, [selectedItem]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!editName) newErrors.name = "Name is required";
    if (!editCategory) newErrors.category = "Category is required";
    if (!editItemCode) newErrors.itemCode = "Item Code is required";
    return newErrors;
  };

  const handleEditItem = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await putEditItem(selectedItem.id, {
        name: editName || null,
        species: editSpecies || null,
        dateOfBirth: editDate || null,
        healthStatus: editHealthStatus || null,
        feedingSchedule: editFeedingSchedule || null,
      });
      fetchItems();
      handleClose();
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const handleModalClose = () => {
    setEditName("");
    setEditCategory("");
    setEditItemCode("");
    setEditSpecies("");
    setEditDate("");
    setEditHealthStatus("");
    setEditFeedingSchedule("");
    setErrors({});
    handleClose();
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (e.target.id === "editItemName") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: undefined,
      }));
    }
  };

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form>
          <div className="form-row">
            <Form.Group
              controlId="editItemName"
              className="form-group half-width"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                value={editName}
                onChange={handleInputChange(setEditName)}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                required
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </Form.Group>
            <Form.Group
              controlId="editItemCategory"
              className="form-group half-width"
            >
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={editCategory}
                disabled
                onChange={handleInputChange(setEditCategory)}
                className={`form-control ${
                  errors.category ? "is-invalid" : ""
                }`}
                required
              >
                <option value="">Select a category</option>
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
          </div>
          <div className="form-row">
            <Form.Group
              controlId="editItemCode"
              className="form-group half-width"
            >
              <Form.Label>Item Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item code"
                value={editItemCode}
                onChange={handleInputChange(setEditItemCode)}
                className={`form-control ${
                  errors.itemCode ? "is-invalid" : ""
                }`}
                disabled
              />
              {errors.itemCode && (
                <div className="text-danger">{errors.itemCode}</div>
              )}
            </Form.Group>
            <Form.Group
              controlId="editSpecies"
              className="form-group half-width"
            >
              <Form.Label>Species</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter species"
                value={editSpecies}
                onChange={handleInputChange(setEditSpecies)}
                className="form-control"
              />
            </Form.Group>
          </div>
          <div className="form-row">
            <Form.Group controlId="editDate" className="form-group half-width">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="Date"
                value={editDate}
                onChange={handleInputChange(setEditDate)}
                className="form-control"
              />
            </Form.Group>
            <Form.Group
              controlId="editHealthStatus"
              className="form-group half-width"
            >
              <Form.Label>Health Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter health status"
                value={editHealthStatus}
                onChange={handleInputChange(setEditHealthStatus)}
                className="form-control"
              />
            </Form.Group>
          </div>

          <Form.Group
            controlId="editFeedingSchedule"
            className="form-group half-width"
          >
            <Form.Label>Feeding Schedule</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter feeding schedule"
              value={editFeedingSchedule}
              onChange={handleInputChange(setEditFeedingSchedule)}
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
          variant="primary"
          onClick={handleEditItem}
          className="add-item-button"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
