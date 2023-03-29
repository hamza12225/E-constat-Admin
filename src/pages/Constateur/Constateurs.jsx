import React from 'react'
import './constateurs.css'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline , RemoveRedEyeOutlinedIcon  } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection, getDoc,doc,getDocs,deleteDoc} from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import { authentication } from "../../firebase-config";
import { db } from "../../firebase-config";
import CircularProgress from '@material-ui/core/CircularProgress';



export default function Constateurs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const  getMarkers= async() =>  {
    const tempDoc = []
     await getDocs(collection(db, "Constateur"))    
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() })
       })
       setData(tempDoc)
        setLoading(false)
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
           
  

  }
// const deleteUs =async(id) => {
//   await deleteDoc(doc(db2, "Utilisateurs", id))
//   .then(() => {
//     console.log("Document successfully deleted!");
//   }).catch((error) => {
//     console.error("Error removing document: ", error);
//   }
//   );
// }

useEffect(() => {
getMarkers();
}, [])
if (loading) {
  return <CircularProgress 
  color="secondary" 
  style={{position: 'absolute', left: '50%', top: '50%',flex: 4,padding:20 ,color: '#000000'}}
  
  
  />;
}

  
  const columns = [
    { field: "id", headerName: "ID", width: 210 },
    {
      field: "displayName",
      headerName: "Clients",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.Nom}  {params.row.Prenom}
          </div>
        );
      },
    },
    { field: "Email", headerName: "Email", width: 200 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    {
      field: "telephone",
      headerName: "Numèro telephone",
      width: 190,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            {/* <DeleteOutline
              className="userListDelete"
              onClick={() => deleteUs(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];



  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={11}
        checkboxSelection
      />
    </div>
  );
}
