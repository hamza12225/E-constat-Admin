import React from 'react'
import './fiche.css'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { CircularProgress } from '@material-ui/core';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';
import logo from './Logo.png'
import QRcode from "react-qr-code";

function Fiche() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const FicheId =  location.pathname.split("/")[2];

  const GetFiche = async() => {
    const docRef = doc(db, "FicheConstat",FicheId);
    const docSnap = await getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data())
        console.log(docSnap.data())
        setLoading(false)
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  

  }

  useEffect(() => {
    GetFiche()
  }, [])




  if (loading) {
    return <CircularProgress 
    color="secondary" 
    style={{position: 'absolute', left: '50%', top: '50%',flex: 4,padding:20 ,color: '#000000'}}
    
    
    />;
  }

  const test = Object.values(data.positionement1[0])
  const test2 = Object.values(data.positionement2[0])


  console.log(test)

  for (let i = 0; i < test.length; i++) {
    if(test[i] === true){
      test[i] = 'Oui'
    }
    else if(test[i] === false){
      test[i] = 'Non'
    }
  }

  
  for (let i = 0; i < test2.length; i++) {
    if(test2[i] === true){
      test2[i] = 'Oui'
    }
    else if(test2[i] === false){
      test2[i] = 'Non'
    }
  }

  
  

  return (
    <div className='LargeContainer'>
                            <QRcode value={FicheId} size={100} />

    <div className='container'>

        <div className='VÉHICULE_A'>
        <h1>Vèhicule A</h1>
        <div className='ShowDetails'>
              <text className='textInfo'>Assurence : {data ? data.Assurence1 || '' :''}</text> <br/>
              <text className='textInfo'>Immatruculation : {data ? data.Immatruculation1 || '' :''} </text><br/>
              <text className='textInfo'>Nom Assure : { data ? data.NomAssure1 || '' :''} </text><br/>
              <text className='textInfo'>Prénom Assure : {data ? data.PrenomAssure1 || '' :''} </text><br/>
              <text className='textInfo'>Numèro de Contrat : {data ? data.Numocontra1 || '' :''} </text><br/>
              <text className='textInfo'>Circonstances : </text><br/>
              
              
              <div className='csr'>
                <ul style={{fontSize:15}}>
                <li>Prenait un stationnement : <strong>{test[0]}</strong></li>
                <li>S'engageait d'un parking lieu privè un chemin de terre : <strong>{test[1]}</strong></li>
                <li>S'engageait sur une place a sens giratoire : <strong>{test[2]}</strong></li>
                <li>Sortait d'un parking lieu privè un chemin de terre  :<strong>{test[3]}</strong></li>
                </ul>
              </div>
 
        



        </div>

        </div>

        <div className='VÉHICULE_B'>
          <h1>Vèhicule B</h1>
          <div className='ShowDetails'>
              
              <text className='textInfo'>Assurence :{data.assurence2} </text> <br/>
              <text className='textInfo'>Immatruculation :{data.immatruculation2}</text><br/>
              <text className='textInfo'>Nom Assure :{data.NomAssure2} </text><br/>
              <text className='textInfo'>Prénom Assure :  {data.PrenomAssure2}</text><br/>
              <text className='textInfo'>Numèro de Contrat : {data.Numocontra2}</text><br/>
              <text className='textInfo'>Circonstances : </text><br/>

              <div className='csr'>
                <ul style={{fontSize:15}}>
                <li>Prenait un stationnement : <strong>{test2[0]}</strong></li>
                <li>S'engageait d'un parking lieu privè un chemin de terre : <strong>{test2[1]}</strong></li>
                <li>S'engageait sur une place a sens giratoire : <strong>{test2[2]}</strong></li>
                <li>Sortait d'un parking lieu privè un chemin de terre  :<strong>{test2[3]}</strong></li>
                </ul>
              </div>



        </div>
       </div>
    </div>
    <div className='document'>
        <PDFViewer style={{height:1500,width:1000}} >
           <Document title={'FICHE DE CONSTAT  : ' + FicheId}>
             <Page pageNumber={1} >
                <View style={{marginLeft:40,marginTop:20}}>
                <Image src={logo} style={{width:50,height:50}}/>
                <Text style={{color:'#5DB075' ,marginTop:10,marginLeft:-10}}>E-Constat</Text>
                </View>
                <View >
                <Text style={{alignSelf:'center', marginTop:5,fontSize:15}}>FICHE DE CONSTAT D'ACCIDENT AUTOMOBILE</Text>
                <Text style={{alignSelf:'center',marginTop:5,fontSize:10}}>ID : {FicheId}</Text>
                <Text style={{alignSelf:'center',marginTop:5,fontSize:10}}>La Date : {data.date}</Text>

                </View>


                 <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={styles.VehiculeA}>
                <Text style={{alignSelf:'center',color:'green'}}>Vèhicule A</Text>
                <View style={{fontSize:10}}>
                  <Text>Nom : </Text>
                  <Text style={{marginBottom:10}}>{data.NomAssure1} </Text>

                  <Text>Prénom : </Text>
                  <Text style={{marginBottom:10}}>{data.PrenomAssure1}</Text>
                  <Text>Code Postal : </Text>
                  <Text style={{marginBottom:10}}>{data.codpostal1} </Text>
                  <Text>Numèro de Téléphone : </Text>
                  <Text style={{marginBottom:10}}>{data.telephone1} </Text>

                  <Text>Assurence : </Text>
                  <Text style={{marginBottom:10}}>{data.Assurence1} </Text>

                  <Text>Immatruculation : </Text>
                  <Text style={{marginBottom:10}}>{data.Immatruculation1} </Text>

                  <Text>Numèro de Contrat : </Text>
                  <Text style={{marginBottom:10}}> {data.Numocontra1} </Text>

                  <Text>Circonstances : </Text>
                  <Text style={{marginTop:10,fontSize:9}}>Prenait un stationnement : <Text style={{textDecoration:"underline"}}>{test[0]}</Text>  </Text>
                  <Text style={{marginTop:5,fontSize:9}}>S'engageait d'un parking lieu privè un chemin de terre:<Text style={{textDecoration:"underline"}}>{test[1]}</Text>  </Text>
                  <Text style={{marginTop:5,fontSize:9}}>S'engageait sur une place a sens giratoire  : <Text style={{textDecoration:"underline"}}>{test[2]}</Text>  </Text>
                  <Text style={{marginTop:5,fontSize:9}}>Sortait d'un parking lieu privè un chemin de terre : <Text style={{textDecoration:"underline"}}>{test[3]}</Text> </Text>
                  <Text style={{marginTop:10}} >Positionnement :</Text>   
                  <Text style={{marginTop:5,fontSize:9}}>{data.Situation2} </Text>  
                  


                 
                </View>
                </View>

                
                <View style={styles.VehiculeB}>
                <Text style={{alignSelf:'center',color:'green'}}>Vèhicule B</Text>

                <View style={{fontSize:10}}>
                  <Text>Nom : </Text>
                  <Text style={{marginBottom:10}}>{data.NomAssure2} </Text>

                  <Text>Prénom : </Text>
                  <Text style={{marginBottom:10}}>{data.PrenomAssure2} </Text>

                  <Text>Code Postal : </Text>
                  <Text style={{marginBottom:10}}>{data.codpostal2} </Text>

                  <Text>Numèro de Téléphone : </Text>
                  <Text style={{marginBottom:10}}>{data.telephone2} </Text>

                  <Text>Assurence : </Text>
                  <Text style={{marginBottom:10}}>{data.assurence2} </Text>

                  <Text>Immatruculation : </Text>
                  <Text style={{marginBottom:10}}>{data.immatruculation2} </Text>

                  <Text>Numèro de Contrat : </Text>
                  <Text style={{marginBottom:10}}>{data.Numocontra2} </Text>

                  <Text>Circonstances : </Text>
                  <Text style={{marginTop:10,fontSize:9}}>Prenait un stationnement : <Text style={{textDecoration:"underline"}}>{test2[0]}</Text>  </Text>
                  <Text style={{marginTop:5,fontSize:9}}>S'engageait d'un parking lieu privè un chemin de terre:<Text style={{textDecoration:"underline"}}>{test2[1]}</Text>  </Text>
                  <Text style={{marginTop:5,fontSize:9}}>S'engageait sur une place a sens giratoire  : <Text style={{textDecoration:"underline"}}>{test2[2]}</Text>  </Text>
                  <Text style={{marginTop:5,fontSize:9}}>Sortait d'un parking lieu privè un chemin de terre : <Text style={{textDecoration:"underline"}}>{test2[3]}</Text> </Text>  
                  <Text style={{marginTop:10}} >Positionnement :</Text>   
                  <Text style={{marginTop:5,fontSize:9}}>{data.Situation1} </Text>                


                 
                </View>

                


      
                
                 
                </View>

                </View>


                <View style={styles.observation}>
                <Text style={{alignSelf:'center',color:'green'}}>Observations</Text>
                <Text style={{marginTop:5,fontSize:9}}>{data.observation} </Text>                
                </View> 







      



             </Page>
           </Document>
          </PDFViewer>

    </div>

    </div>
  )
}

const styles = StyleSheet.create({
  VehiculeA: {
    width: 250,
    height: 450,
    marginLeft: 40,
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    border: '2px solid #000000',
  },

  //  VehiculeB must be placed left side VehiculeA

  VehiculeB: {
    width: 250,
    height: 450,
    marginLeft: 40,
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    border: '2px solid #000000',
    marginRight: 40,
  },
  observation:{
    width: 520,
    height: 120,
    marginLeft: 40,
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    border: '2px solid #000000',
    marginRight: 40,

  }


})

export default Fiche