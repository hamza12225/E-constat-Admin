import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection, getDoc,doc,getDocs,deleteDoc,orderBy,query,onSnapshot} from "firebase/firestore";
import { db } from "../../firebase-config";
import CircularProgress from '@material-ui/core/CircularProgress';


export default function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const  getMarkers= async() =>  {
    // const querySnapshot = await getDocs(collection(db, "Accident"),orderBy("date","desc"))                
    // const tempDoc = []
    // querySnapshot.forEach((doc) => {
    //     tempDoc.push({ id: doc.id, ...doc.data() })
    // })

    const q = query(collection(db, "Accident"), orderBy('timestamp', 'desc'));
    
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
  await deleteDoc(doc(db, "Accident", id))
  
  .then(() => {
    console.log('Deleted ', id)
    alert("le demande a ètè supprimer!")
    getMarkers();
  
  }).catch((error)=> {
    console.log("Something went wrong for the delete Accident Data ");
    console.log(error)
  }) 
}
const statue = (encours) =>{
  if (encours === false){
    return "En cours"
  }else{
    return "Terminer"
  }
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

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

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
      field: "en_cours",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListStatus">
              {statue(params.row.en_cours)}
          </div>
        )
      },
    },
    {
      field: "Userid",
      headerName: "ID  De Client",
      width: 160,
    },
    {
      field: "action",
      headerName: "La localisation",
      width: 190,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Voir La localisation</button>
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
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
