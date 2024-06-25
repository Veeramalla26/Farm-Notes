import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../add-item-modal/add-item-modal.scss";
import { deleteFarmItem } from "../../serviceApis/loginapi";

const DeleteModal = ({ show, handleClose, selectedItem, fetchItems }) => {
  const handleConfirmDelete = async () => {
    try {
      await deleteFarmItem(selectedItem.id); // Assuming selectedItem has an 'id' property
      fetchItems(); // Refresh items after deletion
      handleClose();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {selectedItem?.name}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          className="close-button"
        >
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
