import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConfig'
import { signOut } from 'firebase/auth';
import { UserLogedContext } from '../../context/UserLogedContext';
import profileIcon from '../../assets/icons/perfilIcon.png';
import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './UserDataOverlay.css'
import { RoutesFlagsContext } from '../../context/RoutesFlagsContext';

function UserDataOverlay() {
  const { setIsLoged } = useContext(RoutesFlagsContext);
  const [isVisible, setIsVisible] = useState(false);
  const { 
    userLogedData, 
    userLogedDataCollection,
    setUserLogedDataCollection,
    setUserLogedData,
  } = useContext(UserLogedContext);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    if (userLogedData) {
      setUserMessage(userLogedData.email);
      fetchData();
  };
  }, [userLogedData]);

  const fetchData = async () => {
    const userCollectionRef = collection(db, "Usuario"); 
    const userDocRef = doc(userCollectionRef, userLogedData.uid);

    const querySnapshot = await getDoc(userDocRef);
    setUserLogedDataCollection(querySnapshot.data());
  };

  const handleSalirClick = async () => {

    await signOut(auth);
    setUserLogedDataCollection(null);
    setUserLogedData(null);
    setIsLoged(false);
  };

  const handleUserInfo = () =>{
    setIsVisible(!isVisible); 
  }

  //En esta variable esta la informacion de la coleccion del usuario 
  //console.log(userLogedDataCollection)

  return (
    <div className="user-data-container">
        <button className="btn-perfil" onClick={handleUserInfo}>
        <img src={profileIcon} alt="Perfil" className="profile-icon" />
        </button>
      {isVisible && (
        <div className='UserDropDownMenu'>
          <button onClick={handleSalirClick}>
            Salir
          </button>
          {userMessage && <div className="user-message">{userMessage}</div>}
        </div>
      )}
    </div>
  );
}

export default UserDataOverlay;
