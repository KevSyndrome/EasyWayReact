import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import './div.css';
import Typography from '@mui/material/Typography'
import { Paper, Button } from '@mui/material';
export default function PanelLogIn() {
    return (
        <div className='container'>
            <div className='box'>
                <Paper>
                    <Typography variant="h5" color="initial">Imagen</Typography>
                </Paper>
                <Paper className='button'>
                    <Button
                        variant="contained"
                        className='buttons'
                        sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
                    >
                        Iniciar sesión
                    </Button>
                </Paper>
               <Paper className='button'> 
               <Button
                        variant="contained"
                        className='buttons'
                        sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
                    >
                        Registrarse
                    </Button>
               </Paper>
                  
                    
            </div>
        </div>

    );
}