import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
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
  width: '45%'
}
const typography = {
  variant: 'h3',
  textAlign: 'center',
  margin: '2vw'
}

function ClientsWindow() {
  const [clients, setClients] = useState<Client[]>([])
  useEffect(() => {
    axios.get('http://localhost:5000/api/client').then((response) => {
      setClients(response.data)
    })
  }, [])
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
            <TableBody>{
              clients.map((client: Client, index: number) => (
                <TableRow key={client.ClientName}>
                  <TableCell align="left">{client.ClientName}</TableCell>
                  <TableCell align="left">{client.ClientAddress}</TableCell>
                  <TableCell align="left">{client.ClientPostCode}</TableCell>
                </TableRow>
              )
              )
            }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default ClientsWindow