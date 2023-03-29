import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  carCrashOutlined, 
  
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link" >
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon"        
              />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem ">
                <PermIdentity className="sidebarIcon" />
                Utilisateurs
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                {/* <Storefront className="sidebarIcon" />
                Products */}
                <BarChart className="sidebarIcon" />
                Demandes de constatation

              </li>
            </Link>
            <Link to="/Verification" className="link">
                <li className="sidebarListItem">
                  <VerifiedUserOutlinedIcon className="sidebarIcon" /> 
                  Centre de vérification
                </li>
            </Link>
            <Link to="/FichesConstat" className="link">
                <li className="sidebarListItem">
                  <AssignmentIcon className="sidebarIcon" /> 
                  Les Fiches de constatation
                </li>
            </Link>
  
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Equipe de travail</h3>
          <ul className="sidebarList">
            <Link to="/Constateurs" className="link">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Constateurs
            </li>
            </Link>
             
          </ul>
        </div>
      </div>
    </div>
  );
}
