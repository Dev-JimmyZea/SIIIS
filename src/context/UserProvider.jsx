import { createContext, useEffect, useState } from "react";
import firebaseApp from "../Firebase";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, sendPasswordResetEmail } from "firebase/auth";
const auth = getAuth(firebaseApp);

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);
  // method to logout user
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setTimeout(() => {
          setUser(null);
          signOut(auth);
        }, 8 * 60 * 60 * 1000);
        const { email, metadata, phoneNumber, photoURL, displayName, uid } =
          user;
        setUser({
          email,
          metadata,
          phoneNumber,
          photoURL,
          displayName,
          uid,
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsuscribe();
    };
  }, []);

  // register user
  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // login user
  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // logout user
  const logoutUser = () => signOut(auth);

  // delete user
  const deleteUserWhitID = () => {
    const userTest = getAuth().currentUser;
    return deleteUser(userTest);
  };

  // reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        logoutUser,
        deleteUserWhitID,
        resetPassword
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
