import {
  CalendarToday,
  ImageOutlined,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { Data } from "@react-google-maps/api";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";


// marque: véhicule.marque,
// modèl: véhicule.modèl,
// numèro_serie: véhicule.numèro_serie,
// numèro_chassis: véhicule.numèro_chassis,
// numèro_immatriculation: véhicule.numèro_immatriculation,
// date_mise_circulation: véhicule.date_mise_circulation,
// date_assurance: véhicule.date_assurance,
// date_visite_technique: véhicule.date_visite_technique,


export default function User() {
  const location = useLocation();
  const [userdata, setuserdata] = useState('');
  const [véhicule, setvéhicule] = useState('');
  const [birthday, setbirthday] = useState('');

  const FliterId = location.pathname.split("/")[2];

  const getUser = async() => {
    const docRef = doc(db, "Utilisateurs",FliterId);
    const docSnap = await getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        setuserdata(docSnap.data());
        const date = docSnap.data().date_naissance;
        setbirthday(date.seconds * 1000 + date.nanoseconds / 1000000);
        console.log("Document data:", docSnap.data());
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  }
  const handleUpdate = async() => {
    
    const UserRef = doc(db, "Utilisateurs",FliterId);
  
    await updateDoc(UserRef,{
              numèro_telephone: userdata.numèro_telephone,
              nom: userdata.nom,
              prènom : userdata.prènom,
              date_naissance: userdata.date_naissance,
              CNI: userdata.CNI,
              Adresse: userdata.Adresse,
              displayName: userdata.displayName,
              // imageprofile: imgUrl,
            })

    .then(() => {
      alert('User Updated!');
      console.log('User Updated!');
    })
    .catch(error => {
      console.log('problem update user : ' , error);
  })
    
}

  useEffect(() => {
    getUser();
    // getVehiculeInfos();
  }, [])

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Modifier l'utilisateur</h1>
        <Link to="/Reports">
          <button className="userAddButton">Créer</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={userdata? userdata.imageprofile || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername"></span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Détails du compte</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{userdata? userdata.displayName || ' ' :' '}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{birthday ? new Date(birthday).toLocaleDateString() : userdata.date_naissance}</span>
            </div>
            <div className="userShowInfo">
              <h4>CNI : </h4>
              <span className="userShowInfoTitle">{userdata? userdata.CNI || ' ' :' '}</span>
            </div>
            <span className="userShowTitle">Détails du contact</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{userdata? userdata.numèro_telephone || ' ' :' '}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{userdata? userdata.email || ' ' :' '}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{userdata? userdata.Adresse || ' ' :' '}</span>
            </div>
          </div>
        </div>


        {/* user u */}

        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nom</label>
                <input
                  type="text"
                  placeholder="xxxxxxxxxxxx"
                  className="userUpdateInput"
                  // value={userdata.nom}
                  onChange={(e) => setuserdata({...userdata,nom: e.target.value})}
                />
              </div>
              <div className="userUpdateItem">
                <label>Nom Complet</label>
                <input
                  type="text"
                  placeholder="xxxxxxxxxxxx"
                  className="userUpdateInput"
                  // value={userdata.displayName}
                  onChange={(e) => setuserdata({...userdata,displayName: e.target.value})}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="xxxxxxxxxxxx"
                  className="userUpdateInput"
                  // value={userdata.email}
                  onChange={(e) => setuserdata({...userdata,email: e.target.value})}
                />
              </div>
              <div className="userUpdateItem">
                <label>Tèlèphone</label>
                <input
                  type="text"
                  placeholder="xxxxxxxxxxxx"
                  className="userUpdateInput"
                  // value={userdata.numèro_telephone}
                  onChange={(e) => setuserdata({...userdata,numèro_telephone: e.target.value})}
                />
              </div>
              <div className="userUpdateItem">
                <label>Addresse</label>
                <input
                  type="text"
                  placeholder="xxxxxxxxxxxx"
                  className="userUpdateInput"
                  // value={userdata.Adresse}
                  onChange={(e) => setuserdata({...userdata,Adresse: e.target.value})}
                />
              </div>
              <div className="userUpdateItem">
                <label>CIN</label>
                <input
                  type="text"
                  placeholder="xxxxxxxxxxxx"
                  className="userUpdateInput"
                  // value={userdata.CNI}
                  onChange={(e) => setuserdata({...userdata,CNI: e.target.value})}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={userdata? userdata.imageprofile || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
     
            </div>
          </form>
          <button className="userUpdateButton"
              onClick={() => handleUpdate()}
              >Mise à jour</button>
        </div>
      </div>
    </div>
  );
}
