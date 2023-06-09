import { useContext, createContext, useEffect, useState, } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

const AuthContext = createContext();
const url = 'http://localhost:3000'

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const getGoogleaccount = async (googleEmail) => {
    try {
      // googleEmail is sent as a route parameter
      const account = await axios.get(`${url}/getGoogleaccount/${googleEmail}`);
      return account;
    } catch (error) {
      console.error(error.message);
      console.error('could not get google account');
    }
    return null;
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider)
      .then(async (result) => {
        // The signed-in user info.
        const { user: googleUser } = result;
        const signInMethods = await auth.fetchSignInMethodsForEmail(googleUser.email);

        if (signInMethods.includes("google.com")) {
          // The user's email exists, proceed with login
          const account = await getGoogleaccount(googleUser.email);

        // const account = await getGoogleaccount(googleUser.email);
          setUser(account.data);
        } else {
          // The user's email does not exist, return or show an error message
          console.error("User's email does not exist");
          return;
        }
      }).catch((e) => {
        // Handle Errors here.
        const errorCode = e.code;
        console.error(errorCode);

        const googleErrorMessage = e.message;
        console.error(googleErrorMessage);
      });
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const logOut = () => {
    signOut(auth)
  }


  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
}