import './message.css';
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import {db ,authentication} from '../../firebase-config';
import { addDoc,collection, serverTimestamp ,getDocs } from 'firebase/firestore';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';





function Message() {
	const [message, setMessage] = useState('');
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const filterid = window.location.pathname.split("/")[2]


	
	
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


	useEffect(() => {
		getMarkers();
		}, [])
	if (loading) {
			return <CircularProgress 
			color="secondary" 
			style={{position: 'absolute', left: '50%', top: '50%',flex: 4,padding:20 ,color: '#000000'}}
			
			
			/>;
		  }
		  function Landing() {
			return (
				<>
					<h2>Selectionez un contateur pour contactez</h2>
					<ol className="chat-room-list">
						{data.map((constateur) => (
							<li key={constateur.id}>
								<Link to={`/ChatRoom/${constateur.id}`}className='title'> {constateur.Nom} {constateur.Prenom} </Link>
							</li>
						))}
					</ol>
				</>
			);
		}


	
	
	  

  

  return (
	<div className='messag'>
		<Landing/>
		
	</div>
  )
}

export default Message




{/* <div className='message__header'>
		    <div className='message__headerLeft'>
				        <h4>Contateur</h4>
					    {data.map(constateur =>
						<div className='design'>
							<div key={constateur.id}>
							<div style={{ paddingLeft:'70px' , paddingTop:'15px'}}>
							<h5>{constateur.Nom} {constateur.Prenom}</h5>
							<button className='button2' style={{ marginTop:'15px' ,fontSize:'10px'}}>Envoyer un message</button>
							</div>
						  </div>
						</div>
					)}
					
							
	
					

			</div>
			
			<div className='message__headerRight'>
				
			</div>
		</div>
		
	<form className="send-message">
	  <TextField 
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
		value={message}
        onChange={(e) => setMessage(e.target.value)}
		style={{width: '500px'}}
	   />
	  <Button  className='button' variant="contained" type='submit' style={{ marginTop:'15px'}}>Envoyer </Button>
    </form>
 */}




