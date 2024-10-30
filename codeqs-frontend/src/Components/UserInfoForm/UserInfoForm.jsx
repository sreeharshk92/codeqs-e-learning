import  { useState } from 'react';
import './UserInfoForm.css';

// eslint-disable-next-line react/prop-types
const UserInfoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    occupation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="user-info-form-overlay">
      <div className="user-info-form">
        <h3>Unlock the Full Video</h3>
        <p>Please provide your information to continue watching.</p>
        
        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <fieldset>
            <legend>Personal Details</legend>

            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>


            <label>
              Phone Number:
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
          </fieldset>

          {/* Professional Details */}
          <fieldset>
            <legend>Professional Details</legend>

            <label>
              Education:
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
              />
            </label>

            <label>
              Occupation:
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
            </label>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;
