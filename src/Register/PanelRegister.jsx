import React from 'react';
import { Box, Paper, Typography, TextField, Button, Divider, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';

export default function PanelRegister() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '95vh',
            backgroundColor: '#f5f5f5'
        }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 4, width: 400, textAlign: 'center' }}>
                {/* Logo */}
                <img src={`/LogoWay.png`} alt="Easy Way Logo" style={{ width: 120, marginBottom: 16 }} />

                {/* Títulos */}
                <Typography variant="h5" fontWeight="bold">Registro</Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    Crea tu cuenta llenando los siguientes datos
                </Typography>

                {/*Titulo nombre*/}

                <Typography 
                variant="h6" 
                fontWeight="bold" 
                sx={{ textAlign: "left", width: "100%" }}>Nombre</Typography>



                {/* Campo Nombre */}
                <TextField 
                    fullWidth 
                    color="secondary"
                    label="Nombre"
                    variant="outlined"
                    margin="normal"
                    InputProps={{ sx: { backgroundColor: '#c8e6c9', borderRadius: 2} }}
                />

                {/*Titulo Email*/}

                <Typography 
                variant="h6" 
                fontWeight="bold" 
                sx={{ textAlign: "left", width: "100%" }}>Email</Typography>




                {/* Campo Email */}
                <TextField 
                    fullWidth 
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    InputProps={{ sx: { backgroundColor: '#c8e6c9', borderRadius: 2 } }}
                />

                {/*Titulo Contraseña*/}

                <Typography 
                variant="h6" 
                fontWeight="bold" 
                sx={{ textAlign: "left", width: "100%" }}>Contraseña</Typography>




                {/* Campo Contraseña */}
                <TextField 
                    fullWidth 
                    label="Contraseña"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        sx: { backgroundColor: '#c8e6c9', borderRadius: 2 },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />


                {/*Titulo Confirmar contraseña*/}

                <Typography 
                variant="h6" 
                fontWeight="bold" 
                sx={{ textAlign: "left", width: "100%" }}>Confirmar contraseña</Typography>

                 {/* Campo Confirmar Contraseña */}
                 <TextField 
                    fullWidth 
                    label="Confirmar contraseña"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        sx: { backgroundColor: '#c8e6c9', borderRadius: 2 },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />




                {/* Botón Iniciar Sesión */}
                <Button 
                    fullWidth 
                    variant="contained"
                    sx={{ 
                        backgroundColor: '#1b5e20', 
                        borderRadius: 8, 
                        padding: 1.5,
                        fontSize: '1rem',
                        marginTop: 2,
                        '&:hover': { backgroundColor: '#145a19' }
                    }}
                >
                    Crear cuenta
                </Button>

                {/* Línea Divisoria */}
                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" sx={{ marginTop: 2,}}>
                ¿Ya tienes una cuenta? <a href="/login" style={{ color: '#1b5e20', fontWeight: 'bold', textDecoration: 'none' }}>Inicia sesión</a>   </Typography>

            </Paper>

        </Box>
    );
}