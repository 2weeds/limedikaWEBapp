import { Alert, Box, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { setTimeout } from "timers/promises";

const dropZoneArea = {
  display: "flex",
  justifyContent: 'left',
  backgroundColor: 'white',
  marginRight: '25%',
  marginLeft: '25%',
  marginTop: '10%',
  height: 'auto',
  border: "1px solid black",
  borderRadius: '10px',
  boxShadow: "1px 1px 5px 0px",
  flexDirection: 'column',
  width: '30%'
}
const importButton = {
  backgroundColor: "#a8a8a8",
  fontSize: "18px",
  fontWeight: 100,
  color: '#f0f0f0',

  height: '50px',
  '&:hover': {
    color: '#ff6363',
  },
  '&:active': {
    boxShadow: 'none',
    color: '#f0f0f0',
  },
}
function ImportClientsWindow() {

  const [fileSelected, setFileSelected] = useState<Blob|File|undefined>(undefined);
  const [successAlertShowState, setSuccessAlertShowState] = useState<boolean>(false);
  const [errorAlertShowState, setErrorAlertShowState] = useState<boolean>(false);
  const saveFileSelected= (e:any) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    try {
      setFileSelected(e.target.files[0]);
    }
    catch (error:any){
      console.log(error)
    }
    
  };

  const importFile= async (e:any) => {
    const formData = new FormData();
    formData.append("file", fileSelected as Blob);
    try {
      await axios.post("http://localhost:5000/api/file", formData);
      setSuccessAlertShowState(true);
      
    } catch (ex) {
      setErrorAlertShowState(true);
      console.log(ex);
    }
  };
  const handleClose =()=>{
    setSuccessAlertShowState(false);
    setErrorAlertShowState(false);
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={dropZoneArea}>
        <input type="file" accept='.json' onChange={saveFileSelected} />
        <Button sx={importButton} onClick={importFile}>Importuoti</Button>{
          successAlertShowState? 
          <Alert onClose={handleClose} severity="success">
            Failas sėkmingai įkeltas!
          </Alert>
       :errorAlertShowState?<Alert onClose={handleClose} severity="error">
       Įkelkite json formato failą!
     </Alert>:null
        }
      </Box>
    </Box>
  )
}

export default ImportClientsWindow