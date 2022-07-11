import React, { useState } from 'react';
import { Box, Button, AppBar } from '@mui/material';
import ImportClientsWindow from '../ImportClientsWindow/ImportClientsWindow';
import UpdatePostCodeWindow from '../UpdatePostCodeWindow/UpdatePostCodeWindow';
import ClientsWindow from '../ClientsWindow/ClientsWindow';
import { Helmet } from 'react-helmet';
import picture from '../../1.jpg'


const appBar = {
    position: "static",
    display: "flex",
    flexDirection: "row",
    background: `url(${picture})`,
    height: "8vw"
}

const buttonBox = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: '2vw',
}

const appBarButton = {
    backgroundColor: "transparent",
    fontSize: "18px",
    fontWeight: 100,
    color: '#f0f0f0',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    height: '50px',
    '&:hover': {
        color: '#ff6363',
    },
    '&:active': {
        boxShadow: 'none',
        color: '#f0f0f0',
    },
}

export const MainWindow = () => {
    const [page, setPage] = useState<string>('landing')
    const renderButtons = () => (
        <>
            <Button sx={appBarButton} onClick={() => setPage('importClients')}>Importuoti klientus</Button>
            <Button sx={appBarButton} onClick={() => setPage('updatePostCode')}>Atnaujinti pašto indeksus</Button>
            <Button sx={appBarButton} onClick={() => setPage('ClientList')}>Klientų sąrašas</Button>
        </>
    )
    return page === 'landing' ? (
        <>
            <AppBar sx={appBar}>
                <Box sx={buttonBox}>
                    {
                        renderButtons()
                    }
                </Box>
            </AppBar>
            <Helmet bodyAttributes={{ style: 'background-color : #d1d1d1' }} />
        </>
    ) : page === 'importClients' ? (
        <>
            <AppBar sx={appBar}>
                <Box sx={buttonBox}>
                    {
                        renderButtons()
                    }
                </Box>
            </AppBar>
            <Helmet bodyAttributes={{ style: 'background-color : #d1d1d1' }} />
            <ImportClientsWindow />

        </>

    ) : page === 'updatePostCode' ? (
        <>
            <AppBar sx={appBar}>
                <Box sx={buttonBox}>
                    {
                        renderButtons()
                    }
                </Box>
            </AppBar>
            <Helmet bodyAttributes={{ style: 'background-color : #d1d1d1' }} />
            <UpdatePostCodeWindow />
        </>

    ) : (
        <>
            <AppBar sx={appBar}>
                <Box sx={buttonBox}>
                    {
                        renderButtons()
                    }
                </Box>
            </AppBar>
            <Helmet bodyAttributes={{ style: 'background-color : #d1d1d1' }} />
            <ClientsWindow />
        </>
    )
}
