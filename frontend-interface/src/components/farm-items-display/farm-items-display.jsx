import React, { useState, useEffect } from "react";
import { Button, Container, Table, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaSync } from "react-icons/fa";
import DeleteModal from "./farm-items-delete-modal";
import EditModal from "./farm-items-edit-modal";
import "./farm-items-display.scss";
import { getFarmItems } from "../../serviceApis/loginapi";

const ItemList = ({ id }) => {
  const [items, setItems] = useState({ rows: [], count: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFarmItems({ categoryId: id });
      setItems(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again later.");
      setLoading(false);
    }
  };

  const handleViewClick = (item) => {
    navigate(`/activities`, { state: { item } });
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return `${dateString.substr(8, 2)}/${dateString.substr(
      5,
      2
    )}/${dateString.substr(0, 4)}`;
  };

  return (
    <Container className="item-list">
      <div className="header-container">
        <div className="header">
          <h2>{`Farm items (${items?.count || 0})`}</h2>
        </div>
        <div className="refresh" onClick={fetchItems}>
          <h5>Refresh</h5>
          <FaSync className="refresh-icon" />
        </div>
      </div>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Category</th>
              <th>Species</th>
              <th>Date Of Birth</th>
              <th>Health Status</th>
              <th>Feeding Schedule</th>
              <th>Total Activities Cost</th> {/* New column for Cost Spends */}
              <th>Actions</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="loading-spinner">
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="10">
                  <Alert variant="danger" className="error-message">
                    {error}
                  </Alert>
                </td>
              </tr>
            ) : items?.rows?.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-records-found">
                  No records found
                </td>
              </tr>
            ) : (
              items?.rows?.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.itemCode}</td>
                  <td>{item.Category?.name}</td>
                  <td>{item.species || "-"}</td>
                  <td>
                    {item.dateOfBirth ? formatDate(item.dateOfBirth) : "-"}
                  </td>
                  <td>{item.healthStatus || "-"}</td>
                  <td>{item.feedingSchedule || "-"}</td>
                  <td>{item.totalActivitiesAmount || "-"}</td>{" "}
                  {/* Displaying Cost Spends */}
                  <td className="actions-column">
                    <Button
                      variant="link"
                      onClick={() => handleEditClick(item)}
                      className="action-button"
                      style={{ color: "grey", margin: 0 }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleDeleteClick(item)}
                      className="action-button"
                      style={{ color: "red", margin: 0 }}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="link"
                      onClick={() => handleViewClick(item)}
                      className="action-button"
                      style={{ color: "green", margin: "0" }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        selectedItem={selectedItem}
        fetchItems={fetchItems}
      />

      <EditModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        selectedItem={selectedItem}
        fetchItems={fetchItems}
      />
    </Container>
  );
};

export default ItemList;
