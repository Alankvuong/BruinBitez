import "./UserInfoPage.css";
import React, { useState } from "react";
import Modal from "react-modal";

function UserInfoPage({ onClose }) {
  const [car, setCar] = useState(null);
  const [bio, setBio] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [labelVisible, setLabelVisible] = useState(true);

  const handleLabelClick = () => {
    setLabelVisible(!labelVisible);
  };

  const handleCancelClick = () => {
    onClose();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
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
            <button className="submit">submit</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default UserInfoPage;
