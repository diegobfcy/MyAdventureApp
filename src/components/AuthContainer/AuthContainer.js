import { UserLogedContext } from "../../context/UserLogedContext";
import {useContext, useEffect} from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function AuthContainer({ children }) {
  const { setUserLogedData } = useContext(UserLogedContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFireBase) => {
      if (usuarioFireBase) {
        setUserLogedData(usuarioFireBase);
        try{
          window.localStorage.setItem("user", true)
        }catch (error){
          console.log(error);
        }
      } else {
        setUserLogedData(null);
      }
    });

    return () => unsubscribe();
  }, [setUserLogedData]);
 
  return children;
};

export default AuthContainer;
