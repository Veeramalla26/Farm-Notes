import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./add-farm-activities.scss"; // Make sure your SCSS file is correctly importing

import { getCategories } from "../../serviceApis/loginapi";

const AddActivityModal = ({ show, handleClose, handleAddActivity, item }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(item?.name || ""); // Prefill with itemName if available
  const [farmItemId, setFarmItemId] = useState(item?.id || ""); // Assuming farmItemId is passed from parent component
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [lastFarmActivityDate, setLastFarmActivityDate] = useState(
    getTodayDate()
  );
  const [nextFarmActivityDate, setNextFarmActivityDate] = useState(null); // Using null initially for DatePicker
  const [feedingSchedule, setFeedingSchedule] = useState("");
  const [notes, setNotes] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  // Function to get today's date in 'YYYY-MM-DD' format
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
    if (!name || !farmItemId || !age) {
      setShowErrors(true);
    } else {
      handleAddActivity({
        name,
        farmItemId,
        species: species || undefined,
        age,
        healthStatus: healthStatus || undefined,
        lastFarmActivityDate,
        nextFarmActivityDate: nextFarmActivityDate || undefined,
        feedingSchedule: feedingSchedule || undefined,
        notes: notes || undefined,
      });
      handleClose();
      // Reset form fields
      //   setName("");
      setSpecies("");
      setAge("");
      setHealthStatus("");
      setLastFarmActivityDate(getTodayDate());
      setNextFarmActivityDate(null); // Reset DatePicker to initial state
      setFeedingSchedule("");
      setNotes("");
      setShowErrors(false);
    }
  };

  const handleModalClose = () => {
    // Reset form fields and error state
    // setName("");
    setSpecies("");
    setAge("");
    setHealthStatus("");
    setLastFarmActivityDate(getTodayDate());
    setNextFarmActivityDate(null); // Reset DatePicker to initial state
    setFeedingSchedule("");
    setNotes("");
    setShowErrors(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Farm Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showErrors && (!name || !farmItemId || !age) && (
          <Alert variant="danger">Please fill out all required fields.</Alert>
        )}
        <Form>
          <Form.Group controlId="activityName" className="form-group">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control ${showErrors && !name && "is-invalid"}`}
              disabled // Disable editing since it's received from navigation
              required
            />
            {showErrors && !name && (
              <Form.Text className="text-danger">
                Item Name is required
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="farmItemId" className="form-group">
            <Form.Label>Category ID</Form.Label>
            <Form.Control
              type="text"
              value={farmItemId}
              onChange={(e) => setFarmItemId(e.target.value)}
              className={`form-control ${
                showErrors && !farmItemId && "is-invalid"
              }`}
              disabled // Disable editing since it's received from navigation
              required
            />
            {showErrors && !farmItemId && (
              <Form.Text className="text-danger">
                Farm Item Id is required
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="species" className="form-group">
            <Form.Label>Species</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter species"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="age" className="form-group">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`form-control ${showErrors && !age && "is-invalid"}`}
              required
            />
            {showErrors && !age && (
              <Form.Text className="text-danger">Age is required</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="healthStatus" className="form-group">
            <Form.Label>Health Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter health status"
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="lastFarmActivityDate" className="form-group">
            <Form.Label>Last Farm Activity Date</Form.Label>
            <DatePicker
              selected={new Date(lastFarmActivityDate)}
              onChange={(date) =>
                setLastFarmActivityDate(
                  date ? date.toISOString().split("T")[0] : ""
                )
              }
              className="form-control"
              dateFormat="yyyy-MM-dd"
              disabled // Disable editing since it should always be today's date
            />
          </Form.Group>
          <Form.Group controlId="nextFarmActivityDate" className="form-group">
            <Form.Label>Next Farm Activity Date</Form.Label>
            <DatePicker
              selected={nextFarmActivityDate}
              onChange={(date) =>
                setNextFarmActivityDate(
                  date ? date.toISOString().split("T")[0] : null
                )
              }
              placeholderText="Enter next farm activity date"
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
          </Form.Group>
          <Form.Group controlId="feedingSchedule" className="form-group">
            <Form.Label>Feeding Schedule</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter feeding schedule"
              value={feedingSchedule}
              onChange={(e) => setFeedingSchedule(e.target.value)}
              className="form-control"
            />
          </Form.Group>
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
          className="add-activity-button"
        >
          Add Activity
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddActivityModal;
