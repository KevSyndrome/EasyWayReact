import React from 'react';
import { Box, Paper, Typography, TextField, Button, Divider, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';

export default function PanelLogin() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 4, width: 400, textAlign: 'center' }}>
                {/* Logo */}
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Easy Way Logo" style={{ width: 120, marginBottom: 16 }} />

                {/* Títulos */}
                <Typography variant="h5" fontWeight="bold">Inicio de sesión</Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    Inicia sesión con tu cuenta de <span style={{ color: '#ff9800', fontWeight: 'bold' }}>Easy Way</span>.
                </Typography>

                {/* Campo Email */}
                <TextField 
                    fullWidth 
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    InputProps={{ sx: { backgroundColor: '#c8e6c9', borderRadius: 2 } }}
                />

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
                    Iniciar sesión
                </Button>

                {/* Línea Divisoria */}
                <Divider sx={{ my: 2 }} />

                {/* Botón Google */}
                <Button 
                    fullWidth 
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    sx={{ 
                        backgroundColor: '#1b5e20', 
                        borderRadius: 8, 
                        padding: 1.5,
                        fontSize: '1rem',
                        '&:hover': { backgroundColor: '#145a19' }
                    }}
                >
                    Iniciar sesión con Google
                </Button>

                {/* Enlace para Registrarse */}
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    ¿No tienes una cuenta? <a href="#" style={{ color: '#1b5e20', fontWeight: 'bold', textDecoration: 'none' }}>Regístrate</a>
                </Typography>
            </Paper>
        </Box>
    );
}