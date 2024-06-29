import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa"; // Import the arrow icon
import "./display-farm-activities.scss";
import {
  deleteFarmActivity,
  getFarmItemActivities,
  postAddFarmActivity,
  putEditFarmActivity,
} from "../../serviceApis/loginapi";
import AddActivityModal from "./add-farm-activities";
import EditActivityModal from "./edit-farm-activities"; // Import the EditActivityModal component
import DeleteModal from "./delete-farm-activities"; // Import the DeleteModal component

const FarmActivities = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function
  const [items, setItems] = useState({ rows: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { item } = location.state;
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showEditActivityModal, setShowEditActivityModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFarmItemActivities({
        categoryId: item?.categoryId,
      });
      setItems(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again later.");
      setLoading(false);
    }
  };

  const handleAddActivityClick = () => {
    setShowAddActivityModal(true);
  };

  const handleEditActivityClick = (activity) => {
    setSelectedActivity(activity);
    setShowEditActivityModal(true);
  };

  const handleDeleteActivityClick = (activity) => {
    setSelectedActivity(activity);
    setShowDeleteModal(true);
  };

  const handleCloseAddActivityModal = () => {
    setShowAddActivityModal(false);
  };

  const handleCloseEditActivityModal = () => {
    setShowEditActivityModal(false);
  };

  const handleCloseDeleteModal = () => {
    fetchItems();
    setShowDeleteModal(false);
  };

  const handleAddActivity = async (item) => {
    try {
      const response = await postAddFarmActivity(item);
      console.log(response);
      setShowAddActivityModal(false);
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleEditActivity = async (data) => {
    try {
      const response = await putEditFarmActivity(selectedActivity.id, data);
      console.log(response);
      setShowEditActivityModal(false);
      fetchItems();
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const handleDeleteActivity = async () => {
    try {
      await deleteFarmActivity(selectedActivity.id);
      setShowDeleteModal(false);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return `${dateString.substr(8, 2)}/${dateString.substr(
      5,
      2
    )}/${dateString.substr(0, 4)}`;
  };

  return (
    <div className="farm-activities">
      <div className="header">
        <Button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </Button>
        <h4>Farm Item Activity Details</h4>
      </div>
      <div className="banner">
        <div className="item-details">
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Item Details</Card.Title>
              <Row>
                <Col md={6}>
                  <div className="item-detail">
                    <label>Name:</label>
                    <span>{item.name}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="item-detail">
                    <label>Category:</label>
                    <span>{item.Category?.name}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="item-detail">
                    <label>Code:</label>
                    <span>{item.itemCode || "-"}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="item-detail">
                    <label>Species:</label>
                    <span>{item.species || "-"}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="item-detail">
                    <label>Date of Birth:</label>
                    <span>{formatDate(item.dateOfBirth) || "-"}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="item-detail">
                    <label>Health Status:</label>
                    <span>{item.healthStatus || "-"}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="item-detail">
                    <label>Feeding Schedule:</label>
                    <span>{item.feedingSchedule || "-"}</span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
        <div className="actions">
          <Button
            className="button-add-activity"
            onClick={handleAddActivityClick}
          >
            Add Activities
          </Button>
        </div>
      </div>

      <AddActivityModal
        show={showAddActivityModal}
        handleClose={handleCloseAddActivityModal}
        item={item}
        handleAddActivity={handleAddActivity}
      />

      <EditActivityModal
        show={showEditActivityModal}
        handleClose={handleCloseEditActivityModal}
        activity={selectedActivity}
        handleEditActivity={handleEditActivity}
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        selectedItem={selectedActivity}
        handleDeleteActivity={handleDeleteActivity}
      />

      <div className="activity-list-container">
        {loading ? (
          <div className="text-center mt-3">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="error-message">
            {error}
          </Alert>
        ) : (
          <div className="activity-list">
            {items?.response?.map((activity) => (
              <Card
                key={activity.id}
                className="mb-3 activity-card"
                tabIndex="0"
              >
                <Card.Body>
                  <Card.Text>
                    <label>Name:</label> <span>{activity.name || "-"}</span>
                  </Card.Text>
                  <Card.Text>
                    <label>Last Farm Activity Date:</label>{" "}
                    <span>
                      {formatDate(activity.lastFarmActivityDate || "-")}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <label>Next Farm Activity Date:</label>{" "}
                    <span>
                      {formatDate(activity.nextFarmActivityDate || "-")}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <label>Notes:</label> <span>{activity.notes || "-"}</span>
                  </Card.Text>
                  <div className="activity-actions">
                    <Button
                      variant="success"
                      className="edit-button"
                      onClick={() => handleEditActivityClick(activity)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="delete-button"
                      onClick={() => handleDeleteActivityClick(activity)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmActivities;
