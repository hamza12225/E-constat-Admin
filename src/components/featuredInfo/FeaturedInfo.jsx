import { useEffect } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState } from "react";
import { collection, getDoc,doc,getDocs,deleteDoc,orderBy,query,onSnapshot,where} from "firebase/firestore";
import { db } from "../../firebase-config";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAuth, deleteUser } from "firebase/auth";
import { authentication } from "../../firebase-config";


export default function FeaturedInfo() {
  const [NumbersOfClients, setNumbersOfClients] = useState([]);
  const [NumbersOfAccidents, setNumbersOfAccidents] = useState([]);
  const [NumbersOfAccidentsTraite, setNumbersOfAccidentsTraite] = useState([]);

  const GetNumbersOfClients = async() => {
    const querySnapshot = await getDocs(collection(db, "Utilisateurs"))
    const tempDoc = []
    querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() })
    })
    setNumbersOfClients(tempDoc)
}
const GetNumbersOfAccidents = async() => {
  const querySnapshot = await getDocs(collection(db, "Accident"))
  const tempDoc = []
  querySnapshot.forEach((doc) => {
      tempDoc.push({ id: doc.id, ...doc.data() })
  })
  setNumbersOfAccidents(tempDoc)
}
const GetNumbersOfAccidentsTraite = async() => {
  const querySnapshot = await getDocs(collection(db, "Accident"))
  const tempDoc = []
  querySnapshot.forEach((doc) => {

      if(doc.data().en_cours === false){
      tempDoc.push({ id: doc.id, ...doc.data() })
      }
    
  })
  setNumbersOfAccidentsTraite(tempDoc)
}
useEffect(() => {
  GetNumbersOfClients();
  GetNumbersOfAccidents();
  GetNumbersOfAccidentsTraite();
}, [])


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Clients :</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{NumbersOfClients.length}</span>
        </div>
        
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Demandes reçus :</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{NumbersOfAccidents.length}</span>

        </div>
        
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Demandes traitées :</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{NumbersOfAccidentsTraite.length}</span>

        </div>
       
      </div>
    </div>
  );
}
