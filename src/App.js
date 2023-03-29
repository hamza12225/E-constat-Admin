import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Verification from "./pages/Centre_vérification/Verification";
import Constateurs from "./pages/Constateur/Constateurs";
import Reports from "./pages/Reports/Reports";
import Vehicule from "./pages/VehiculeInfos/Vehicule";
import Message from "./pages/Message/Message";
import { ChatRoom } from "./chatrom/ChatRoom";
import FichesConstat from "./pages/Fiches/FichesConstat";
import Login from "./pages/Login/Login";
import { authentication } from "./firebase-config";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fiche from "./pages/Fiche/Fiche";


function App() {
  const [Initializing , setInitializing] = useState(true);
  const [Userx,setUserx] = useState();

  function onAuthStateChanged(Userx){
    setUserx(Userx);
    if(Initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = authentication.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  } , [] );
  
  
  if(Initializing) return (
    <CircularProgress 
    color="secondary" 
    style={{position: 'absolute', left: '50%', top: '50%',flex: 4,padding:20 ,color: '#000000'}}/>
    
  );

  if(!Userx){
    return <Login/>
  }

  return (
    <Router>

      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/users">
            <UserList />
          </Route>

          <Route path="/User/:userId">
            <User />
          </Route>

          <Route path="/newUser">
            <NewUser />
          </Route>

          <Route path="/products">
            <ProductList />
          </Route>

          <Route path="/product/:productId">
            <Product />
          </Route>

          <Route path="/newproduct">
          <NewProduct /> 
          </Route>

          <Route path="/Verification">
          <Verification />
          </Route>

          <Route path="/Constateurs">
          <Constateurs />
          </Route>

          <Route path="/Reports">
          <Reports />
          </Route>

          <Route path="/Vehicule">
          <Vehicule />
          </Route>

          <Route path="/Message">
          <Message />
          </Route>

          <Route path="/ChatRoom">
          <ChatRoom />
          </Route>

          <Route path="/FichesConstat">
          <FichesConstat />
          </Route>


          <Route path="/Fiche">
          <Fiche />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
