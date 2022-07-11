import { Box, Button } from '@mui/material';
import { DropzoneArea } from 'material-ui-dropzone'
import React, { useEffect, useState } from 'react'

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
  const [files, setFiles] = useState<File[]>();
  useEffect(() => {
    console.log(files)
  }, [files]
  )
  const handleOnClick = () => {
    return
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={dropZoneArea}>
        <DropzoneArea acceptedFiles={['.json']} onChange={(files) => setFiles(files)} getDropRejectMessage={() => 'Galimas tik json formatas!'}></DropzoneArea>
        <Button sx={importButton} onClick={() => handleOnClick}>Importuoti</Button>
      </Box>
    </Box>
  )
}

export default ImportClientsWindow