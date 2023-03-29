import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline , RemoveRedEyeOutlinedIcon  } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection, getDoc,doc,getDocs,deleteDoc} from "firebase/firestore";
import { db } from "../../firebase-config";
import { getAuth, deleteUser } from "firebase/auth";
import { authentication } from "../../firebase-config";




export default function WidgetSm() {
  const [data, setData] = useState([]);
  // console.log('this', data);
  const  getMarkers= async() =>  {
    const querySnapshot = await getDocs(collection(db, "Utilisateurs"))                
    const tempDoc = []
    querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() })
    })
    setData(tempDoc)
    console.log(tempDoc)

}
useEffect(() => {
  getMarkers();
  }, [])
  const name = 'hamza'

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Nouveaux membres</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">h</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Afficher
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">h</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Afficher
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">h</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Afficher
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">h</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Afficher
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">h</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Afficher
          </button>
        </li>
      </ul>
    </div>
  );
}
