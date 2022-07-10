import React from 'react';
import './App.css';
import {SnackbarProvider} from 'notistack';
import { MainWindow } from './views/MainWindow/MainWindow';

const App = () => 
    <SnackbarProvider maxSnack={2}>
      <MainWindow />
    </SnackbarProvider>

export default App;
