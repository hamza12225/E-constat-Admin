import React, { useState } from 'react'
import './reports.css'
import { authentication } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { Button ,TextField} from '@mui/material';


export default function Reports() {
  const [email,setemail] =useState('')
  const [password,setpassword] =useState('')
  const [nom , setNom] = useState('')
  const [prenom , setPrenom] = useState('')
  const [telephone , setTelephone] = useState('')
  const [date_naissance , setDate_naissance] = useState('')
  const [CIN , setCIN] = useState('')
  const [adresse , setAdresse] = useState('')
  
  const userdata = {
    email:email,
    nom: nom,
    prènom: prenom,
    numèro_telephone: telephone,
    displayName: nom + ' ' + prenom,
    imageprofile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    date_inscription: new Date().toLocaleDateString() +  '  ' + new Date().getHours() + ':' + new Date().getMinutes(),
    actif: true,
    CNI :CIN,
    date_naissance: date_naissance,
    Verified : false,
    Adresse :''
  };
  const vèhiculeData = {
    la_marque: '',
    Modèle : '',
    immatriculation: '',
    Année_à_régler: '',
    Puissance_fiscale: '',
    Carte_grise: '',
    date_inscription: new Date().toLocaleDateString() +  '  ' + new Date().getHours() + ':' + new Date().getMinutes(),
  }



  const register = async () => {
    createUserWithEmailAndPassword(authentication, email, password)
    .then(async(userCredential) => {
      alert('user created')
      console.log('user created');
     await setDoc(doc(db,"Utilisateurs",authentication.currentUser.uid),userdata)  
     await setDoc(doc(db,"Utilisateurs",authentication.currentUser.uid,"Vèhicule",authentication.currentUser.uid),vèhiculeData)
     alert('user created data submitted')
    }).catch((error) => {
      console.log('problem creating user : ' , error);
    })
  }


  return (
    <div className='newUser'>
      <h1>Nouvel Utilisateur</h1>
      <form className="newUserForm">

        <div className="newUserItem">
          <label>Nom</label>
          <input type="text" placeholder="Ahmed jbrane"
          value={nom}
          onChange={(e)=>setNom(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Prènom</label>
          <input type="text" placeholder="Ahmed jbrane"
          value={prenom}
          onChange={(e)=>setPrenom(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="Ahmed@gmail.com"
          value={email}
          onChange={(e)=>setemail(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Mot de passe</label>
          <input type="password" placeholder="password" 
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Téléphone</label>
          <input type="text" placeholder="+212 26 46 78 75" 
          value={telephone}
          onChange={(e)=>setTelephone(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Adresse</label>
          <input type="text" placeholder="Guelmim Rue hassan 2 N13" 
          value={adresse}
          onChange={(e)=>setAdresse(e.target.value)}

          />
        </div>
        <div className="newUserItem">
          <label>Date naissance</label>
          <input type="text" placeholder="10/02/1998" 
          value={date_naissance}
          autoComplete="off"
          onChange={(e)=>setDate_naissance(e.target.value)}
          />
        </div>

        <div className="newUserItem">
          <label>CNI</label>
          <input type="text" placeholder="JA12345"
          value={CIN}
          autoComplete="off"
          onChange={(e)=>setCIN(e.target.value)}
          />
        </div>

      
      </form>
      
      <button className='newUserButton' type='submit' onClick={register}>Crèer Utilisateur</button>

    </div>
  )
}
