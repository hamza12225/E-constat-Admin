import React from 'react'
import './Verification.css'
import Data from '../../Data.js'
import { Link } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline  ,TaskAltIcon} from "@material-ui/icons";
import { collection, getDoc,doc,getDocs,deleteDoc ,updateDoc} from "firebase/firestore";
import { db } from "../../firebase-config";
import { authentication } from '../../firebase-config';
import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


function Verification() {
  const [Data,setData] = useState([])
  const [loading, setLoading] = useState(true);


    const  getMarkers = async() =>  {
                const querySnapshot = await getDocs(collection(db, "Utilisateurs"))                
              
                const tempDoc = []
                querySnapshot.forEach((doc) => {
                  if(doc.data().Verified== false){
                    tempDoc.push({ id: doc.id, ...doc.data() })
                  }
                })
                 setData(tempDoc)
                 setLoading(false)
       }



    const VerifedUser = async(statue , id) =>{
     
      if(statue === false){
        const DocRef = doc(db, "Utilisateurs", id)
        await updateDoc(DocRef, {
          Verified: true
        })
        .then(() => {
          console.log('Updated ', id)
          alert("User is Verifed!")
          // getMarkers();
        })
      }
    }

    const columns = [
      { field: "id", headerName: "ID", width: 210 },
      {
        field: "displayName",
        headerName: "Client",
        width: 180,
        renderCell: (params) => {
          return (
            <div className="userListUser">
              <img className="userListImg" src={params.row.imageprofile} alt="" />
              {params.row.displayName}
            </div>
          );
        },
      },
      { field: "email", headerName: "Email", width: 200 },
      // {
      //   field: "status",
      //   headerName: "Status",
      //   width: 120,
      // },
      {
        field: "numèro_telephone",
        headerName: "Numèro telephone",
        width: 190,
      },
      {
        field: "action",
        headerName: "Action",
        width: 250,
        renderCell: (params) => {
          return (
            <>
                <button className="userListEdit"
                onClick={() => VerifedUser(params.row.Verified,params.row.id)}
                >Vèrifie </button>

             <Link to={"/user/" + params.row.id}>
              <button className="userListEdit"
              >Infos</button>
            </Link>
            <Link to={"/Vehicule/" + params.row.id}>
              <button className="userListEdit"
              >véhicule</button>
            </Link>
                



            </>
          );
        },
      },
    ];

    useEffect(() => {
      getMarkers();
      }, [])
    if (loading) {
        return <CircularProgress 
        color="secondary" 
        style={{position: 'absolute', left: '50%', top: '50%',flex: 4,padding:20 ,color: '#000000'}}
        
        
        />;
      }

  return (
    <div className="Verification">
    <DataGrid
      rows={Data}
      disableSelectionOnClick
      columns={columns}
      pageSize={11}
      checkboxSelection
    />
  </div>
  )
}

export default Verification;




// const ValiderLaDemande = async(statue , id) =>{
//   // statue est id de la demande statue est egale en_cours et id est id de la demande

//   if(statue === false){
//     const DocRef = doc(db, "Accident", id)
//     await updateDoc(DocRef, {
//       Verified: true
//     })
//     .then(() => {
//       console.log('Updated ', id)
//       alert("Demande est traitè !")
//       // getMarkers();
//     })
//   }
// }


// const Getdemande = async() =>  {
//   const querySnapshot = await getDocs(collection(db, "Accident"))                
//   const tempDoc = []
//   querySnapshot.forEach((doc) => {
//     if(doc.data().en_cours== false){
//       tempDoc.push({ id: doc.id, ...doc.data() })
//     }
//   })
//   setdemande(tempDoc)
//   setLoading(false)
// }
