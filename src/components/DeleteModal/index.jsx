import React from "react";
import "./index.css";

const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure want to delete this post ?</h2>
        <div className="modal-buttons">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
