import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "../add-item-modal/add-item-modal.scss"; // Make sure your SCSS file is correctly importing

const EditActivityModal = ({
  show,
  handleClose,
  handleEditActivity,
  activity,
}) => {
  const [name, setName] = useState("");
  const [farmItemId, setFarmItemId] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [lastFarmActivityDate, setLastFarmActivityDate] = useState("");
  const [nextFarmActivityDate, setNextFarmActivityDate] = useState("");
  const [notes, setNotes] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (show && activity) {
      setName(activity.name);
      setFarmItemId(activity.FarmItem?.id);
      setItemCode(activity.FarmItem?.itemCode);
      setLastFarmActivityDate(formatDate(activity.lastFarmActivityDate));
      setNextFarmActivityDate(formatDate(activity.nextFarmActivityDate));
      setNotes(activity.notes);
      setShowErrors(false); // Reset errors on modal open
    }
  }, [show, activity]);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  }

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = () => {
    if (!name || !farmItemId || !nextFarmActivityDate) {
      setShowErrors(true);
    } else {
      handleEditActivity(activity.id, {
        name,
        lastFarmActivityDate,
        nextFarmActivityDate: nextFarmActivityDate || undefined,
        notes: notes || undefined,
      });
      handleClose();
      resetForm();
    }
  };

  const handleModalClose = () => {
    handleClose();
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setFarmItemId("");
    setItemCode("");
    setLastFarmActivityDate("");
    setNextFarmActivityDate("");
    setNotes("");
    setShowErrors(false);
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Farm Activity</Modal.Title>
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
                  Item Name is required
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
                disabled // Disable editing since it's received from navigation
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
                onChange={(e) =>
                  setLastFarmActivityDate(formatDate(e.target.value))
                }
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
                onChange={(e) =>
                  setNextFarmActivityDate(formatDate(e.target.value))
                }
                className={`form-control ${
                  showErrors && !nextFarmActivityDate && "is-invalid"
                }`}
              />
              {showErrors && !nextFarmActivityDate && (
                <Form.Text className="text-danger">
                  Next Farm Activity Date is required
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
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditActivityModal;
