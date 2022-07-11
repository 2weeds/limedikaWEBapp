import { Box, Button, TextField } from '@mui/material'
import React from 'react'

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

const textField = {
  margin: '5vw',
  marginLeft: '5vw',
  width: 'auto',
  backgroundColor: 'white'
}

function UpdatePostCodeWindow() {
  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <Box sx={formContainer}>
        <TextField sx={textField} label='Įveskite adresą formatu....' />
        <Button sx={updateButton} onClick={() => { }}>Atnaujinti</Button>
      </Box>
    </Box>
  )
}

export default UpdatePostCodeWindow