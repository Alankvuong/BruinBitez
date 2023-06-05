import React, { useState } from "react"
import {UserAuth} from '../../context/AuthContext';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./newUserSignUp.css";

export default function NewUserSignUp() {
    const [step, setStep] = useState(1);
    const {user} = UserAuth();
    const email = user.email;
    console.log(2, user);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [car, setCar] = useState("");
    const [school, setSchool] = useState("");


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

        try {
        const userData = {
            firstName,
            lastName,
            bio,
            car,
            school,
            email,
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
        } catch (error) {
        console.error("Error adding document: ", error);
        }
    };

    const renderStep1 = () => {
        return (
        <div>
            <div className="infoContainer">
                <div>Basic Information</div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        className="firstNameContainer"
                    />
                </div>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={handleLastNameChange}
                />
                <input
                    type="text"
                    name="bio"
                    placeholder="Enter bio"
                    value={bio}
                    onChange={handleBioChange}
                />
            </div>
            <button onClick={handleNext}>Next</button>
        </div>
        );
    };

    const renderStep2 = () => {
        return (
        <div>
            <div className="infoContainer">
                <h2>Step 2</h2>
                <div>School</div>
                <input
                    type="text"
                    name="school"
                    value={school}
                    onChange={handleSchoolChange}
                />
            </div>
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>Next</button>
        </div>
        );
    };

    const renderStep3 = () => {
        return (
        <div>
            <div className="infoContainer">
                <h2>Step 3</h2>
                <div>car</div>
                <input
                    type="text"
                    name="car"
                    value={car}
                    onChange={handleCarChange}
                />
            </div>
            <button onClick={handlePrev}>Previous</button>
            <button type="submit" onClick={handleSubmit}>Submit</button>
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
        <div style={{backgroundColor: 'rgb(248,250,253)', height:'100%', paddingTop: '1%', paddingBottom: "3%"}}>
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
                    <div className="stepDescription">Basic Information</div>
                </div>
                <div className="step">
                    <div className="stepDescription">School</div>
                </div>
                <div className="step">
                    <div className="stepDescription">Car</div>
                </div>
            </div>
            <div>
                {renderCurrentStep()}
            </div>
        </div>
    );
}
