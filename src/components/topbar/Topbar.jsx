import React from "react";
import "./topbar.css";
import { AccountBox, Settings ,ExitToApp} from "@material-ui/icons";
import logo from "./Logo.png";
import { authentication } from '../../firebase-config';
import { signOut } from "firebase/auth";
import Alert from '@mui/material/Alert';


export default function Topbar() {
  const HanduleSignout = () => {
    authentication
    .signOut()
    .then(() => {
      // Sign-out successful.
      alert("Sign-out successful.")
    })
    .catch(error => alert(error.message))
  }
    

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">E-constat</span>
          <img src={logo} style={{height:25,width:25 ,marginLeft:10,marginTop:15}}></img>
          

        </div>
        <div className="topRight">

          <div className="topbarIconContainer">
            <ExitToApp 
            onClick={HanduleSignout}
            
            />
            
          </div>
          <img src="https://firebasestorage.googleapis.com/v0/b/app-auth-9d075.appspot.com/o/LOGO.png?alt=media&token=14b389aa-460a-4f99-bfcc-3d1bc5b2dea4" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
