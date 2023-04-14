import './AlertMessage.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';

const AlertMessage = ({ message, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' || event.key === 'Enter') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="popup-container">
            <div className="popup">
                <div className="popup-inner">
                    <div className="popup-message">Error:</div>
                    <div className="popup-message">{message}</div>
                    <button className="popup-close post-btn" onClick={onClose}>
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};


export const handleAlert = (message) => {
    const alert = document.createElement('div');
    alert.setAttribute('id', 'alert');
    document.body.appendChild(alert);
    ReactDOM.createRoot(alert).render(
        <AlertMessage message={message} onClose={() => alert.remove()} />
    );
}