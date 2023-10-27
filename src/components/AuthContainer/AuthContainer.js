import { UserLogedContext } from "../../context/UserLogedContext";
import {useContext, useEffect} from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { PlaceOfertProvider } from '../../context/PlaceOfertContext';
import { RoutesFlagsContext } from "../../context/RoutesFlagsContext";

function AuthContainer({ children }) {
  const { setUserLogedData } = useContext(UserLogedContext);
  const { setIsLoged } = useContext(RoutesFlagsContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFireBase) => {
      if (usuarioFireBase) {
        setUserLogedData(usuarioFireBase);
        setIsLoged(true);
      } else {
        setUserLogedData(null);
      }
    });

    return () => unsubscribe();
  }, [setUserLogedData]);
 
  return (
    <PlaceOfertProvider>
      {children}
    </PlaceOfertProvider>
  );
};

export default AuthContainer;
