import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

interface Client {
  name:string,
  adress:string,
  postCode:string
}

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
  width: '45%'
}
const typography = {
  variant:'h3',
  textAlign:'center',
  margin:'2vw'
}
function ClientsWindow() {
  var arr:Client[]=[
    {name:"UAB \"Gintarinė vaistinė\" fil. nr. 2",adress:"Liepų al. 3-1B, Panevėžys",postCode:""},
    {name:"UAB \"Gintarinė vaistinė\" fil. nr. 3",adress:"Varnių g. 39-9, Kaunas",postCode:""},
    {name:"UAB \"Gintarinė vaistinė\" fil. nr. 5",adress:"Švenčionių g. 36-2, Nemenčinė, Vilniaus r. sav.",postCode:""}
  ]
  
  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      
      <Box sx={formContainer}>
      <Typography variant='h4' sx={typography}>Klientų sąrašas</Typography>
      <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Pavadinimas</TableCell>
            <TableCell align="left">Adresas</TableCell>
            <TableCell align="left">Pašto Kodas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arr.map((row) => (
            <TableRow>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.adress}</TableCell>
              <TableCell align="left">{row.postCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </Box>
  )
}

export default ClientsWindow