import { Box, Button } from '@mui/material';
import { display } from '@mui/system';
import { DropzoneArea } from 'material-ui-dropzone'
import React, { useEffect, useState } from 'react'

const dropZoneArea = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection:'column',
  marginTop:'15vw'
}
const importButton = {
  backgroundColor: "#a8a8a8",
    fontSize: "18px",
    fontWeight: 100,
    color: '#f0f0f0',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginRight:'20vw',
    height: '50px',
    '&:hover': {
        color: '#ff6363',
    },
    '&:active': {
        boxShadow: 'none',
        color: '#f0f0f0',
    },
    marginTop:'2vw'
}
function ImportClientsWindow() {
  const [files, setFiles] = useState<File[]>();
  useEffect(() => {
    console.log(files)
  }, [files]
  )
  return (
    <>
    <Box sx={dropZoneArea}>
    <Box sx={{width:'60%'}}>
      <DropzoneArea acceptedFiles={['.json']} onChange={(files) => setFiles(files)} getDropRejectMessage={() => 'Galimas tik json formatas!'}></DropzoneArea>
    </Box>
    </Box>
    <Box id='123'>
    <Button sx={importButton}>Importuoti</Button>
    </Box>
    </>
    
    
  )
}

export default ImportClientsWindow