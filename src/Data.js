import React from 'react';
import {db} from './firebase-config';
import { useState, useEffect } from 'react';
import { collection, getDoc,doc,getDocs} from "firebase/firestore";
import { authentication } from'./firebase-config';
import { async } from '@firebase/util';
import { Link } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";




function Data() {
    const [data,setdata] = useState([])


    const  getMarkers= async() =>  {
                const querySnapshot = await getDocs(collection(db, "Utilisateurs"))                
              
                const tempDoc = []
                querySnapshot.forEach((doc) => {
                    tempDoc.push({ id: doc.id, ...doc.data() })
                })
                console.log(tempDoc)
                 setdata(tempDoc)
       }

    // useEffect(() => {
    //     getMarkers();
    //     }, [])

    const columns = [
      { field: "id", headerName: "ID", width: 210 },
      {
        field: "displayName",
        headerName: "Clients",
        width: 200,
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
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Link to={"/user/" + params.row.id}>
                <button className="userListEdit">Edit</button>
              </Link>
              <DeleteOutline
                className="userListDelete"
                // onClick={() => deleteUs(params.row.id)}
              />
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
  )
}

export default Data