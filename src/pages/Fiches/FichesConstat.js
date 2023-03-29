import React from 'react'
import './fichesconstat.css'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDoc,doc,getDocs,deleteDoc,query,orderBy,onSnapshot} from "firebase/firestore";
import { db } from "../../firebase-config";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAuth, deleteUser } from "firebase/auth";
import { authentication } from "../../firebase-config";
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';



function FichesConstat() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const  getMarkers= async() =>  {
    const q = query(collection(db, "FicheConstat"), orderBy('timestamp', 'desc'));
    
    onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
          messages.push({ id: doc.id, ...doc.data() });
      })
      setData(messages)
      setLoading(false)
    })

}

const deleteItem = async (id) => {
  await deleteDoc(doc(db, "FicheConstat", id))
  
  .then(() => {
    console.log('Deleted ', id)
    alert("le demande a ètè supprimer!")
    getMarkers();
  
  }).catch((error)=> {
    console.log("Something went wrong for the delete Accident Data ");
    console.log(error)
  }) 
}


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
    { field: "id", headerName: "ID", width: 90 },
    // {
    //   field: "product",
    //   headerName: "Position",
    //   width: 120,
    //   // renderCell: (params) => {
    //   //   return (
    //   //     <div className="productListItem">
    //   //       <img className="productListImg" src={params.row.img} alt="" />
    //   //       {params.row.name}
    //   //     </div>
    //   //   );
    //   // },
    // },
    { field: "date", headerName: "Date de Demande", width: 200 },
    {
      field: "action",
      headerName: "La Fiche De Constat",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/Fiche/" + params.row.id}>
              <button className="productListEdit">Voir La Fiche</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => deleteItem(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='fiches'>
       <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  )
}

export default FichesConstat