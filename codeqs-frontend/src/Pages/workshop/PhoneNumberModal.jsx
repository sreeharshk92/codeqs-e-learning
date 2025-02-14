import { useState } from "react";
import './PhoneNumberModal.css'
const PhoneNumberModal = ({ onSubmit, onClose }) => {
  const [phone, setPhone] = useState("");

  const handleConfirm = () => {
    if (phone.length === 10) {
      onSubmit(phone);
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enter Your Phone Number</h2>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={10}
        />
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PhoneNumberModal;
