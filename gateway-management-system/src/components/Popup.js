import React from "react";
import "../style.css"

const Popup = ({ trigger, setTrigger, children }) => {
    return trigger ? (
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-content">
            {children}
            <button className="close-btn text-btn" onClick={() => setTrigger(false)}>
            Cancel
          </button>
            </div>
          
        </div>
      </div>
    ) : null;
  };

  export default Popup;
  