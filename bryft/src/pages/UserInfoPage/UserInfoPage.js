import "./UserInfoPage.css";
import Navbar from "../../components/Navbar/Navbar";
import {useState} from "react";

function UserInfoPage() {
    const [car, setCar] = useState(null);
    const [bio, setBio] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [labelVisible, setLabelVisible] = useState(true);

    const handleLabelClick = () => {
    setLabelVisible(!labelVisible);
    };

    return (
        <div>
            <Navbar />
            <h1 className="title">thanks, now tell us more about yourself!</h1>
            <div className="mainform">
                <form>
                    <label>car model</label>
                    <input
                        type = "text"
                        placeholder="*☆ﾟ°˖* ᕕ( ᐛ )ᕗ"
                        required
                        value={car}
                        onChange={(e) =>setCar(e.target.value)}
                    />
                    <label>bio</label>
                    <textarea
                        placeholder="keep it short and sweet :)"
                        required
                        value={bio}
                        onChange={(e) =>setBio(e.target.value)}
                    />
                    <div>
                        <label>upload a pic</label>
                        {selectedImage && (
                            <div>
                            <img
                                alt="not found"
                                width={"250px"}
                                src={URL.createObjectURL(selectedImage)}
                            />
                            <br />
                            <button onClick={() => {setSelectedImage(null); handleLabelClick();}}>remove</button>
                            </div>
                        )}
                        
                        <input
                            type="file"
                            id = "myImage"
                            name="myImage"
                            className="file-input"
                            onChange={(event) => {
                            console.log(event.target.files[0]);
                            setSelectedImage(event.target.files[0]);
                            handleLabelClick();
                            }}
                        />
                        {labelVisible && (<label htmlFor="myImage" className="file-input-label" >choose file</label>)}
                        </div>
                    <button className="submit">submit</button>
                </form>
            </div>
        </div>
    )
}
export default UserInfoPage;