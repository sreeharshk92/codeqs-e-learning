import { useState } from 'react';
import './UserInfoForm.css'; // Make sure this CSS file exists
import baseUrl from '../../config/baseUrl';

const UserInfoForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        education: '',
        occupation: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${baseUrl}/api/personal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert(result.message);
            if (onSubmit) {
                onSubmit(formData);
            }

            resetForm();
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            education: '',
            occupation: '',
        });
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

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserInfoForm;
