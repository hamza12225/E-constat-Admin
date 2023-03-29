import React from 'react'
import './login.css'

import { Grid,Paper, Avatar, TextField, Button, Typography,Link ,Checkbox, } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { authentication } from '../../firebase-config';
import Alert from '@mui/material/Alert';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const LoginAdmin = () =>{
    if(!email) return alert('email is empty')
    if(!password) return alert('password is empty')
    if(password.length < 5) return alert('password is too short') 
    if(email === 'admin@e-constat.com'){
      signInWithEmailAndPassword(authentication, email, password)
      .then(()=>{
        console.log('succes signIn Admin !')
        alert('succes signIn Admin !')
        return(<Alert>succes signIn Admin !</Alert>);

        
      })
      .catch((err)=>{
        console.log(err);
        console.log('il ya un problem! ')
        if(err.code === 'auth/user-not-found'){
          alert('email admin Invalid !')
          return(<Alert>email admin Invalid</Alert>);
        }
        if(err.code === 'auth/wrong-password'){
          alert('mot pass admin Invalid !')
        }
        if(err.code === 'auth/invalid-email'){
          alert('email admin Invalid !')
        }
      })
    }else{
      alert('email admin Invalid !')
    }

    
  }
  

  const paperStyle={padding :20,height:'70vh',width:300, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0',backgroundColor:'#1bbd7e',borderRadius:'20px',marginTop:'30px'}

  
  return (
    

    <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>s'authentifier</h2>
                </Grid>
                <TextField label='Email Admin' placeholder='Email Admin' variant="outlined" fullWidth required style={{marginTop:'30px'}} value={email} onChange={(e)=>setEmail(e.target.value)}/>

                <TextField label='Mot pass Admin' placeholder='Mot pass Admin' type='password' variant="outlined" fullWidth required style={{marginTop:'30px'}} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={LoginAdmin}>connexion</Button>


            </Paper>
        </Grid>

  )
}
const useStyles = makeStyles({
  page: {
    backgroundColor: 'red',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login