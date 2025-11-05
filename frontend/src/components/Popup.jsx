import { useEffect } from "react";
import "../styles/Popup.css";

function Popup({ message, type = "info", visible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(t);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`popup popup-${type}`} role="status">
      <div className="popup-message">{message}</div>
      <button className="popup-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}

export default Popup;
