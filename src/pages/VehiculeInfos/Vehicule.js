import React from 'react'
import './vehicule.css'
import { useState, useEffect } from 'react';
import { collection, getDoc,doc,getDocs,deleteDoc ,updateDoc} from "firebase/firestore";
import { db } from "../../firebase-config";


function Vehicule() {
    const filterid = window.location.pathname.split("/")[2]
    const [marque,setmarque] = useState('')
    const [Carte_grise,setCarte_grise] = useState('')
    const [Modèle,setModèle] = useState('')
    const [Puissance_fis,setPuissance_fis] = useState('')
    const [imattri,setimattri] = useState('')
    const [Année_à_régler,setAnnée_à_régler] = useState('')
    const [véhicule,setvéhicule] = useState([])

    const getVehiculeInfos = async() => {
        const docRef = doc(db, "Utilisateurs",filterid ,"Vèhicule",filterid);
        const docSnap = await getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setvéhicule(docSnap.data()) 
            console.log("Document data:", docSnap.data());
          }
        })  
        .catch((error) => {
          console.log("Error getting document:", error);
        })
      }
      
      const handleUpdateVehicule = async() =>  {
        const UserRef = doc(db, "Utilisateurs",filterid ,"Vèhicule",filterid);
        await updateDoc(UserRef,{
                  Année_à_régler: Année_à_régler,
                  Carte_grise: Carte_grise,
                  Marque: marque,
                  Modèle: Modèle,
                  Puissance_fiscale: Puissance_fis,
                  imattriculation: imattri,          
        })
        .then(() => {
          console.log('Vehicule Updated!');
          alert('Vehicule Updated!');
        })
        .catch(error => {
          console.log('problem update vehicule : ' + error);
      })
      
      }
      
      useEffect(() => {
        getVehiculeInfos()
        }, [])

  return (
    <div className='newUser'>
        <h1 className='newUserTitle'>Informations sur le véhicule</h1>
        <div className="newUserContainer">
            <h4 className='info'>Modèle : {véhicule? véhicule.Modèle || ' ':' '}</h4>
            <h4 className='info'>La Marque : {véhicule? véhicule.Marque || ' ':' '}</h4>
            <h4 className='info'>Année à régler : {véhicule? véhicule.Année_à_régler || ' ':' '}</h4>
            <h4 className='info'>Modèle : {véhicule? véhicule.Modèle || ' ':' '}</h4>
            <h4 className='info'>Puissance fiscale : {véhicule? véhicule.Puissance_fiscale || ' ':' ' }</h4>
            <h4 className='info'>imattriculation : {véhicule? véhicule.imattriculation || ' ':' '}</h4>
        </div>
   
        
        <form className="newUserForm">
        <div className="newUserItem">
          <label>La Marque</label>
          <input type="text" 
          value={marque}
          onChange={(e)=>setmarque(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Modèle</label>
          <input type="text" 
          value={Modèle}
          onChange={(e)=>setModèle(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Carte grise</label>
          <input type="email"
          value={Carte_grise}
          onChange={(e)=>setCarte_grise(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>imattriculation</label>
          <input type="text" 
          value={imattri}
          onChange={(e)=>setimattri(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Puissance fiscale</label>
          <input type="text" 
          value={Puissance_fis}
          onChange={(e)=>setPuissance_fis(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Année à régler</label>
          <input type="text" 
          value={Année_à_régler}
          onChange={(e)=>setAnnée_à_régler(e.target.value)}
          />
        </div>
      </form>
      <button className='newUserButton' type='submit' onClick={handleUpdateVehicule}>Mise à jour</button>

    </div>
  )
}

export default Vehicule