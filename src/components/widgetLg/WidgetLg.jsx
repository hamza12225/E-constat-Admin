import "./widgetLg.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection,query,orderBy,onSnapshot} from "firebase/firestore";
import { db } from "../../firebase-config";
import { DataGrid } from "@material-ui/data-grid";
import CircularProgress from '@material-ui/core/CircularProgress';



export default function WidgetLg() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const  getMarkers= async() =>  {

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
      { field: "date", headerName: "Date de Demande", width: 200 },
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
  
            </>
          );
        },
      },
    ];


  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Dernières Demandes</h3>
      
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={4}
        checkboxSelection
      />
      
    </div>
  );
}
