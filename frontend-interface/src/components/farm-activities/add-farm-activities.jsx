import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "../add-item-modal/add-item-modal.scss";

import { getCategories } from "../../serviceApis/loginapi";

const AddActivityModal = ({ show, handleClose, handleAddActivity, item }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [farmItemId, setFarmItemId] = useState(item?.id || "");
  const [itemCode, setItemCode] = useState(item?.itemCode);
  const [lastFarmActivityDate, setLastFarmActivityDate] = useState(
    getTodayDate()
  );
  const [nextFarmActivityDate, setNextFarmActivityDate] = useState(null);
  const [activityCost, setActivityCost] = useState("");
  const [notes, setNotes] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  }

  const handleFetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  const handleSubmit = () => {
    if (!name || !farmItemId || !nextFarmActivityDate || !activityCost) {
      setShowErrors(true);
    } else {
      handleAddActivity({
        name,
        farmItemId,
        lastFarmActivityDate,
        nextFarmActivityDate: nextFarmActivityDate || undefined,
        amount: activityCost,
        notes: notes || undefined,
      });

      handleClose();
      setName("");
      setLastFarmActivityDate(getTodayDate());
      setNextFarmActivityDate(null);
      setActivityCost("");
      setNotes("");
      setShowErrors(false);
    }
  };

  const handleModalClose = () => {
    setName("");
    setLastFarmActivityDate(getTodayDate());
    setNextFarmActivityDate(null);
    setActivityCost("");
    setNotes("");
    setShowErrors(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Farm Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form>
          <div className="form-row">
            <Form.Group
              controlId="activityName"
              className="form-group half-width"
            >
              <Form.Label>Activity Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`form-control ${
                  showErrors && !name && "is-invalid"
                }`}
                required
                placeholder="Enter Activity Name"
              />
              {showErrors && !name && (
                <Form.Text className="text-danger">
                  Activity Name is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="itemCode" className="form-group half-width">
              <Form.Label>Item Code</Form.Label>
              <Form.Control
                type="text"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
                className={`form-control ${
                  showErrors && !itemCode && "is-invalid"
                }`}
                disabled
                required
              />
              {showErrors && !itemCode && (
                <Form.Text className="text-danger">
                  Farm Item Code is required
                </Form.Text>
              )}
            </Form.Group>
          </div>
          <div className="form-row">
            <Form.Group
              controlId="lastFarmActivityDate"
              className="form-group half-width"
            >
              <Form.Label>Last Farm Activity Date</Form.Label>
              <Form.Control
                type="date"
                value={lastFarmActivityDate}
                onChange={(e) => setLastFarmActivityDate(e.target.value)}
                className="form-control"
                disabled
              />
            </Form.Group>

            <Form.Group
              controlId="nextFarmActivityDate"
              className="form-group half-width"
            >
              <Form.Label>Next Farm Activity Date</Form.Label>
              <Form.Control
                type="date"
                value={nextFarmActivityDate}
                onChange={(e) => setNextFarmActivityDate(e.target.value)}
                className={`form-control ${
                  showErrors && !farmItemId && "is-invalid"
                }`}
              />
              {showErrors && !nextFarmActivityDate && (
                <Form.Text className="text-danger">
                  Farm Activity Date is required
                </Form.Text>
              )}
            </Form.Group>
          </div>

          <div className="form-group">
            <Form.Group controlId="activityCost" className="">
              <Form.Label>Activity Cost</Form.Label>
              <Form.Control
                type="number"
                value={activityCost}
                onChange={(e) => setActivityCost(e.target.value)}
                className={`form-control ${
                  showErrors && !activityCost && "is-invalid"
                }`}
                required
                placeholder="Enter Activity Cost"
              />
              {showErrors && !activityCost && (
                <Form.Text className="text-danger">
                  Activity Cost is required
                </Form.Text>
              )}
            </Form.Group>
          </div>

          <Form.Group controlId="notes" className="form-group">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
          Add Activity
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddActivityModal;
