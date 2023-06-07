import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import {UserAuth} from '../../context/AuthContext';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./newUserSignUp.css";
import { getAuth } from "firebase/auth";

import happyBruin from '../../assets/happyBruin.png';
import bruinHead from '../../assets/bruin-head.png'
import uclaLogo from '../../assets/ucla-logo.png';
import yellowBruin from '../../assets/ucla-bear-logo.png';

const images = [
    bruinHead,
    happyBruin,
    uclaLogo,
    yellowBruin,
  ];


export default function NewUserSignUp() {
    const [step, setStep] = useState(1);
    const {user} = UserAuth();
    const email = user?.email;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [car, setCar] = useState("");
    const [school, setSchool] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate()

    const handleImageClick = (image) => {
        if (selectedImage === image) {
          setSelectedImage(null); // Unselect the image if it is already selected
        } else {
          setSelectedImage(image); // Select the image if it is not already selected
        }
    };

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
        
    };

    const handlePrev = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleBioChange = (e) => {
        setBio(e.target.value);
    }

    const handleSchoolChange = (e) => {
        setSchool(e.target.value);
    }

    const handleCarChange = (e) => {
        setCar(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const auth = getAuth(); // Get the Firebase Auth instance
        const user = auth.currentUser; // Get the current user object

        if (user) {
            const uid = user.uid; // Get the UID of the current user
            try {
            const userData = {
                firstName,
                lastName,
                uid,
                bio,
                car,
                school,
                email,
                selectedImage,
            };

            // Save the user data to the Firestore database
            const userDocRef = await addDoc(collection(db, "users"), userData);
            console.log("User document written with ID: ", userDocRef.id);

            // Clear the input fields
            setFirstName("");
            setLastName("");
            setBio("");
            setSchool("");
            setCar("");
            setSelectedImage(null);
            navigate('/')
            } catch (error) {
            console.error("Error adding document: ", error);
            }
        } else {
            console.log("No user is currently signed in.");
          }
    };

    const renderStep1 = () => {
        const isButtonDisabled = !firstName || !lastName;
        
        return (
        <div>
            <div className="infoContainer">
                <div className="basicInfoContainer">Basic Information</div>
                <div className="dividingLine"/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '4.5vh'}}>
                    <div className="names">
                        <div className="inputLabel">First name</div>
                    </div>
                    <div className="names">
                        <div className="inputLabel">Last name</div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '4vh'}}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        className="firstNameContainer"
                        required
                        maxLength={20}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={handleLastNameChange}
                        className="firstNameContainer"
                        required
                        maxLength={40}
                    />
                </div>
                <div style={{marginLeft: '2vh'}}>
                    <div className="inputLabelBio">Bio</div>
                    <textarea 
                        placeholder="Enter bio (optional)"
                        name="bio"
                        value={bio}
                        onChange={handleBioChange}
                        className="bioContainer"
                    />
                </div>
                <div>
                    <div className="dividingLine"/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: '3vh',}}>
                    <div className="bottomContainer">
                        <button onClick={handleNext} className="nextButton" disabled={isButtonDisabled}>Next: School & Car</button> 
                    </div>
                </div>
            </div>
        </div>
        );
    };

    const renderStep2 = () => {
        const isButtonDisabled = !school || !car;
        
        return (
        <div>
            <div className="infoContainer">
                <div className="basicInfoContainer">School & Car</div>
                <div className="dividingLine"/>
                <div className="schoolText">School</div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <input
                        type="text"
                        name="school"
                        placeholder="Enter school"
                        value={school}
                        onChange={handleSchoolChange}
                        className="schoolContainer"
                        required
                        maxLength={50}
                    />
                </div>
                <div style={{marginLeft: '2vh'}}>
                    <div className="inputLabelBio">Car</div>
                    <textarea 
                        placeholder="Enter car (N/A if no car)"
                        name="bio"
                        value={car}
                        onChange={handleCarChange}
                        className="carContainer"
                        required
                        maxLength={200}
                    />
                </div>
                <div>
                    <div className="dividingLine"/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: '3vh',}}>
                    <div className="bottomContainerSC"> 
                        <button onClick={handlePrev} className="prevButton">Back to Step 1</button>
                        <button onClick={handleNext} className="nextToStep3Button" disabled={isButtonDisabled}>Next: Personalization</button>
                    </div>
                </div>
            </div>
        </div>
        );
    };

    const renderStep3 = () => {
        const isButtonDisabled = !school || !car;
        
        return (
        <div>
            <div className="infoContainer">
                <div className="basicInfoContainer">Personalization</div>
                <div className="dividingLine"/>
                <div className="schoolText">Pick an avatar or choose your own later:</div>
                <div className="imageContainer">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className={`imageItem ${selectedImage === image ? "selectedImage" : ""}`}
                            onClick={() => handleImageClick(image)}
                        />
                    ))}
                </div>
                <div>
                    <div className="dividingLine"/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: '3vh',}}>
                    <div className="bottomContainerSC"> 
                        <button onClick={handlePrev} className="prevButton">Back to Step 2</button>
                        <button type="submit" onClick={handleSubmit} className="nextToStep3Button" disabled={isButtonDisabled}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        );
    };

    const renderCurrentStep = () => {
        switch (step) {
        case 1:
            return renderStep1();
        case 2:
            return renderStep2();
        case 3:
            return renderStep3();
        default:
            return null;
        }
    };

    return (
        <div style={{backgroundColor: 'rgb(248,250,253)', height:'100%', paddingTop: '1%', paddingBottom: "8%"}}>
            <div>
                <div className={"bryftLogo"}>BRYFT</div>
            </div>
            <div>
                <div className={"description"}>Welcome to your local ridesharing platform!</div>
            </div>
            <div>
                <div className={"moreDescription"}>You are one step closer to finding your next ride.  Let's set up your <br/> profile before we start so you can join and create rides!</div>
            </div>
            <div className="progress-container">
                <div className={`progress-line ${step >= 1 ? "active1" : ""}`}/>
                <div className={`progress-line ${step >= 2 ? "active2" : ""}`}/>
                <div className={`progress-line ${step >= 3 ? "active1" : ""}`}/>
            </div>
            <div className="stepsContainer">
                <div className="step">
                    <div className={`step1 ${step >= 1 ? "active" : ""}`}>STEP 1</div>
                </div>
                <div className="step">
                    <div className={`step2 ${step >= 2 ? "active4" : ""}`}>STEP 2</div>
                </div>
                <div className="step">
                    <div className={`step3 ${step >= 3 ? "active" : ""}`}>STEP 3</div>
                </div>
            </div>
            <div className="stepsContainer">
                <div className="step">
                    <div className={`step1 ${step >= 1 ? "active5" : ""}`}>Basic Information</div>
                </div>
                <div className="step">
                    <div className={`step2 ${step >= 2 ? "active5" : ""}`}>School & Car</div>
                </div>
                <div className="step">
                    <div className={`step3 ${step >= 3 ? "active5" : ""}`}>Personalization</div>
                </div>
                {/* <div className="step">
                    <div className="stepDescription">Basic Information</div>
                </div>
                <div className="step">
                    <div className="stepDescription">School & Car</div>
                </div>
                <div className="step">
                    <div className="stepDescription">Personalization</div>
                </div> */}
            </div>
            <div>
                {renderCurrentStep()}
            </div>
        </div>
    );
}
