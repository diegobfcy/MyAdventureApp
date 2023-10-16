import { useState, useEffect } from "react";
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function GuideOverlay() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'RequestPlaces'));
      const querySnapshot = await getDocs(q);
      setData(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  console.log(data)

  return (
    
    <h1>Eres un Guia</h1>

  );

}

export default GuideOverlay;