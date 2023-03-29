import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useJsApiLoader ,GoogleMap, Marker  } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import { getDataGridUtilityClass } from "@material-ui/data-grid";
import { getDoc ,doc} from "firebase/firestore";
import { useEffect ,useState } from "react";
import { db } from "../../firebase-config";

export default function Product() {
    const filterId = useLocation().pathname.split("/")[2];
    const [coordinates, setcoordinates] = useState('');
    const [userId, setuserId] = useState('');
    const [User, setUser] = useState('');

    const getUser = async() => {
      const docRef = doc(db, "Utilisateurs",userId);
      const docSnap = await getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setUser(docSnap.data())
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
      
    }

  

        


    const GetPostion = async()=>{
        const AccidentRef =  doc(db, "Accident",filterId );

        await getDoc(AccidentRef,{
          
        }).then((docs)=>{
          console.log("coordinate Accident successfully geted!");
          setcoordinates(docs.data().coordinate)
          setuserId(docs.data().Userid)
          console.log(docs.data().coordinate)
    
        }).catch((error)=>{
          console.error("Error geted coordinate Accident: ", error);
        })
      }
    
        useEffect(() => {
        GetPostion();
        getUser();
        }, [])

        const { isLoaded } = useJsApiLoader({
            googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        })
        if(!isLoaded){
            return <div>Loading...</div>
        }
    
        
    
return (
    <div className="product">
        <GoogleMap
            mapContainerStyle={{width: "100%", height: "100%"}}
            zoom={16}
            center={{lat: coordinates.latitude, lng: coordinates.longitude}}
        >
        <Marker position={{lat: coordinates.latitude, lng: coordinates.longitude}}
        title={"Accident Informations :  " + "Nom complete :" + User.displayName + " Tèlèphone : " + User.numèro_telephone } 
                
        />

        </GoogleMap>
        
    </div>

  );
}
