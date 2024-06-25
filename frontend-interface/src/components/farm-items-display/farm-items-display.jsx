import React, { useState, useEffect } from "react";
import { Button, Container, Table, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import DeleteModal from "./farm-items-delete-modal";
import EditModal from "./farm-items-edit-modal";
import "./farm-items-display.scss";
import { getCategories, getFarmItems } from "../../serviceApis/loginapi";

const ItemList = ({ id }) => {
  const [items, setItems] = useState({ rows: [], count: 0 });
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors
      const response = await getFarmItems(id);
      setItems(response);
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again later.");
      setLoading(false); // Stop loading
    }
  };

  const handleViewClick = (item) => {
    navigate(`/activities`, { state: { item } }); // Navigate to FarmActivities with item details
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

  return (
    <Container className="item-list">
      <div className="header">
        <h2>{`All farm items (${items?.count || 0})`}</h2>
      </div>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Actions</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="loading-spinner">
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4">
                  <Alert variant="danger" className="error-message">
                    {error}
                  </Alert>
                </td>
              </tr>
            ) : items?.rows?.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-records-found">
                  No records found
                </td>
              </tr>
            ) : (
              items?.rows?.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.Category?.name}</td>
                  <td className="actions-column">
                    <Button
                      variant="link"
                      onClick={() => handleEditClick(item)}
                      className="action-button"
                      style={{ color: "grey" }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleDeleteClick(item)}
                      className="action-button"
                      style={{ color: "red" }}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="link"
                      onClick={() => handleViewClick(item)}
                      className="action-button"
                      style={{ color: "green" }}
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