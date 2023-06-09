import React from "react";
import Modal from 'react-modal';

function ModalComponent({ isOpen, closeModal, isSignUp, handleToggleMode, handleSignIn, handleSignUp, handleLogin, handleGoogleSignUp, email, setEmail, password, setPassword, error }) {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
        content: {
          width: '30%',
          height: '84%',
          borderRadius: 34,
          boxShadow: 'rgba(0, 0, 0, 0.45) 0px 2px 10px',
          position: 'absolute',
          top: '9.5%',
          left: '34%',
          marginTop: '-2%',
        }
      }}
      contentLabel="Login Modal"
    >
        {isSignUp ? (
            <div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <div className="popupLogo">
                        BRYFT
                    </div>
                    <div onClick={closeModal} style={{borderWidth: 2, cursor: 'pointer'}}>
                        <img src={require("../assets/ex.png")} alt="exit button" className="exButton" />
                    </div>
                </div>
                <div className="welcomeMessage">
                    Welcome!
                </div>
                <div className="descriptionMessage">
                    Sign up to share your next ride.
                </div>
                <div className="signInButtonContainer">
                    <div onClick={handleGoogleSignUp} className="googleContainer">
                        <img src={require("../assets/google-logo.png")} alt="google logo" className="googleLogo"/>
                        <div className="googleText">Google</div>
                    </div>
                </div>
                <div className="divideContainer">
                    <hr style={{width: '46.3%', marginTop: '2.2%', color: 'lightgrey'}}/>
                    <div>or</div>
                    <hr style={{width: '46.3%', marginTop: '2.2%', color: 'lightgrey'}}/>
                </div>
                <div>
                    <div className="emailText">Email</div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="emailSignUpInput"
                        />
                    </div>
                    <div className="passwordText">Password</div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="passwordSignUpInput"
                        />
                    </div>
                    {"error" && <div className="error">{error}</div>}
                    <button onClick={handleSignUp} className="signInButton">
                        Sign Up
                    </button>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '3%'}}>
                            <div className="createAccountText" onClick={handleToggleMode}>Back to Sign In</div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <div className="popupLogo">
                        BRYFT
                    </div>
                    <div onClick={closeModal} style={{borderWidth: 2, cursor: 'pointer'}}>
                        <img src={require("../assets/ex.png")} alt="exit button" className="exButton" />
                    </div>
                </div>
                <div className="welcomeMessage">
                    Welcome back!
                </div>
                <div className="descriptionMessage">
                    Please enter your details to sign in.
                </div>
                <div className="signInButtonContainer">
                    <div onClick={handleSignIn} className="googleContainer">
                        <img src={require("../assets/google-logo.png")} alt="google logo" className="googleLogo"/>
                        <div className="googleText">Google</div>
                    </div>
                </div>
                <div className="divideContainer">
                    <hr style={{width: '46.3%', marginTop: '2.2%', color: 'lightgrey'}}/>
                    <div>or</div>
                    <hr style={{width: '46.3%', marginTop: '2.2%', color: 'lightgrey'}}/>
                </div>
                <div>
                    <div className="emailText">Email</div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="emailSignUpInput"
                        />
                    </div>
                    <div className="passwordText">Password</div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="passwordSignUpInput"
                        />
                    </div>
                    {"error" && <div className="error">{error}</div>}
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '3.5%'}}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: '-2%',}}>
                            <input 
                                type="checkbox"
                                className="checkbox"
                            />
                            <div className="rememberText">Remember for 30 days</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: '-2%'}}>
                            <div className="forgotPasswordText">Forgot Password</div>
                        </div>
                    </div>
                    <button onClick={handleLogin} className="signInButton">
                        Sign In
                    </button>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '3%', gap: '1%'}}>
                            <div className="noAccountText">Don't have an account?</div>
                            <div className="createAccountText" onClick={handleToggleMode}>Create account</div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </Modal>
  )
}

export default ModalComponent;