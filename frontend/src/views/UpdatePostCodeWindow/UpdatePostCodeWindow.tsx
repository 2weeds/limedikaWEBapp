import { Alert, Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Client } from '../../Entities/Client'

const formContainer = {
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

const updateButton = {
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
const searchedItems = {
  backgroundColor: "#ededed",
  fontSize: "18px",
  fontWeight: 100,
  color: 'solid black',
  height: '50px',
}

const textField = {
  margin: '5vw',
  marginLeft: '5vw',
  width: 'auto',
  backgroundColor: 'white'
}

function UpdatePostCodeWindow() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState("");
  const [searchText, setSearchText] = useState("");
  const [addressShowState, setAddressShowState] = useState(true)
  const [successAlertShowState, setSuccessAlertShowState] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:5000/api/client').then((response) => {
      setClients(response.data)
    })
  }, [])
  const handleUpdateOnClick = async () => {
    const formData = new FormData();
    formData.append("address", searchText)
    try {
      await axios.post("http://localhost:5000/api/client", formData);
      setSuccessAlertShowState(true);
    }
    catch (e: any) {
      console.log(e)
    }
  }
  const handleClose = () => {
    setSuccessAlertShowState(false);
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={formContainer}>
        <TextField
          sx={textField}
          label='Įveskite adresą'
          value={searchText}
          onChange={(event) => {
            setSearchTerm(event.target.value)
            setSearchText(event.target.value)
            setAddressShowState(true)
          }} />
        {
          clients.filter((val) => {
            if (searchTerm === "") {
              return null
            }
            else if (val.ClientAddress.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) && addressShowState === true) {
              return val
            }
          }).map((row, index: number) => (
            <Button sx={searchedItems} onClick={() => {
              setSearchText(row.ClientAddress)
              setAddressShowState(false)
            }}>{row.ClientAddress}</Button>
          ))
        }
        <Button sx={updateButton} onClick={handleUpdateOnClick}>Atnaujinti</Button>{
          successAlertShowState ?
            <Alert onClose={handleClose} severity="success">
              Pašto indeksas sėkmingai atnaujintas!
            </Alert> : null
        }

      </Box>
    </Box>
  )
}

export default UpdatePostCodeWindow