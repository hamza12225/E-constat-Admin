import "./newUser.css";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { authentication } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";




export default function NewUser() {
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [date_naissance, setDate_naissance] = useState("");
  const [CIN, setCIN] = useState("");
  const [adresse, setAdresse] = useState("");
  const [imageprofile, setImageprofile] = useState("");
  

  
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
    Adresse : adresse,

  };

  // const vèhiculeData = {
  //   la_marque: '',
  //   Modèle : '',
  //   immatriculation: '',
  //   Année_à_régler: '',
  //   Puissance_fiscale: '',
  //   Carte_grise: '',
  //   date_inscription: new Date().toLocaleDateString() +  '  ' + new Date().getHours() + ':' + new Date().getMinutes(),

  // }

  // const vehiculeData = async ()=> {
  //   const docRef = doc(db, "Utilisateurs", authentication.currentUser.uid ,"Vèhicule",authentication.currentUser.uid);
  //   const docSnap = await setDoc(docRef, vèhiculeData)
  //   .then(() => {
  //     console.log("vehicule submitted successfly");
  //   }).catch((error)=> {
  //     console.log("Something went wrong for the vehicule ");
  //     console.log(error)
  //   }) 
  // }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nouvel utilisateur</h1>
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
          autoComplete="off"
          value={prenom}
          onChange={(e)=>setPrenom(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="Ahmed@gmail.com"
          autoComplete="off"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Mot de passe</label>
          <input type="password" placeholder="password" 
          value={password}
          autoComplete="off"
          onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Téléphone</label>
          <input type="text" placeholder="+212 26 46 78 75" 
          value={telephone}
          onChange={(e)=>setTelephone(e.target.value)}
          autoComplete="off"
          />
        </div>
        <div className="newUserItem">
          <label>Adresse</label>
          <input type="text" placeholder="Guelmim Rue hassan 2 N13" 
          value={adresse}
          autoComplete="off"
          onChange={(e)=>setAdresse(e.target.value)}

          />
        </div>
        <div className="newUserItem">
          <label>Date naissance</label>
          <input type="text" placeholder="Guelmim Rue hassan 2 N13" 
          value={date_naissance}
          autoComplete="off"
          onChange={(e)=>setDate_naissance(e.target.value)}
          />
        </div>

        <div className="newUserItem">
          <label>CNI</label>
          <input type="text" placeholder="Guelmim Rue hassan 2 N13"
          value={CIN}
          autoComplete="off"
          onChange={(e)=>setCIN(e.target.value)}
          />
        </div>

        
        <button className="newUserButton"
        type="sumbit"
        >Create</button>
      </form>
    </div>
  );
}
