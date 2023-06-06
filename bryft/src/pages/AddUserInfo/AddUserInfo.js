import React, { useState } from "react";
import axios from "axios";

function AddUserInfo() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [car, setCar] = useState('');
    const [bio, setBio] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Send user information to the backend API endpoint
        await axios.post('http://localhost:8000/api/submit-user', {
          firstName,
          lastName,
          car,
          bio,
        });
  
        // Clear form fields
        setFirstName('');
        setLastName('');
        setCar('');
        setBio('');
  
        console.log('User information submitted successfully!');
      } catch (error) {
        console.error('Error submitting user information:', error);
      }
    };
  
    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                Last Name:
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                Car:
                <input
                type="text"
                value={car}
                onChange={(e) => setCar(e.target.value)}
                />
            </label>
            <br />
            <label>
                Bio:
                <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
            </form>
        );
        };

export default AddUserInfo;