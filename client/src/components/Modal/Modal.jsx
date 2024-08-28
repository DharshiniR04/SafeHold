import React from 'react';
import './Modal.css';

function Modal({ message, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onClose} className="close-btn">Ok</button>
            </div>
        </div>
    );
}

export default Modal;
