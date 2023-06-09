import "./UserInfoPage.css";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function UserInfoPage({ onClose, userInfo }) {
  const [car, setCar] = useState(userInfo[0]?.data.car || null);
  const [bio, setBio] = useState(userInfo[0]?.data.bio || null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [labelVisible, setLabelVisible] = useState(true);

  useEffect(() => {
    // console.log(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    const auth = getAuth(); // Get the Firebase Auth instance
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        onClose();
      }
    });
  }, []);

  const handleLabelClick = () => {
    setLabelVisible(!labelVisible);
  };

  const handleCancelClick = () => {
    onClose();
  };

  const handleSubmit = async () => {
    try {
      const auth = getAuth(); // Get the Firebase Auth instance
      const user = auth.currentUser; // Get the current user object

      console.log("USER:", user.uid);
      if (user) {
        const userUID = user.uid;

        const formData = new FormData();

        // Append the file to the FormData object
        formData.append("file", selectedImage);

        // Append other form fields to the FormData object
        formData.append("car", car);
        formData.append("bio", bio);
        formData.append("userUID", userUID);

        // console.log(selectedImage);
        // Send the FormData object in the POST request
        const response = await axios.post(
          "http://localhost:8000/api/update-user-profile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
      }

      console.log("File uploaded successfully");
      onClose(); // Close the modal after successful submission
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedImage(file);
    handleLabelClick();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setLabelVisible(true);
  };


  return (
    <Modal
      isOpen={true}
      onRequestClose={handleCancelClick}
      contentLabel="User Info"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h1 className="title">time to make some changes...</h1>
      <div className="mainform modal-content">
        <form>
          <label>car model</label>
          <input
            type="text"
            placeholder="*☆ﾟ°˖* ᕕ( ᐛ )ᕗ"
            value={car}
            onChange={(e) => setCar(e.target.value)}
          />
          <label>bio</label>
          <textarea
            placeholder="keep it short and sweet :)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <div>
            <label>upload a pic</label>
            {selectedImage ? (
              <div>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <button onClick={handleRemoveImage}>remove</button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  id="myImage"
                  name="myImage"
                  className="file-input"
                  onChange={handleImageChange}
                />
                {labelVisible && (
                  <label htmlFor="myImage" className="file-input-label">
                    choose file
                  </label>
                )}
              </div>
            )}
          </div>
          <div className="button-row">
            <button className="cancel" onClick={handleCancelClick}>
              cancel
            </button>
            <button className="submit" onClick={handleSubmit}>submit</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default UserInfoPage;
