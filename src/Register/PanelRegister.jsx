import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Divider, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PanelRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [telefono, setTelefono] = useState(''); // Agregado campo de teléfono

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre, 
                email, 
                telefono, // Ahora enviamos el teléfono
                contrasena: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = "/login";  // Redirigir al login
        } else {
            alert(data.message);
        }
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
                <img src={`/LogoWay.png`} alt="Easy Way Logo" style={{ width: 120, marginBottom: 16 }} />
                <Typography variant="h5" fontWeight="bold">Registro</Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    Crea tu cuenta llenando los siguientes datos
                </Typography>

                <TextField 
                    fullWidth 
                    label="Nombre"
                    variant="outlined"
                    margin="normal"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    InputProps={{ sx: { backgroundColor: '#c8e6c9', borderRadius: 2 } }}
                />

                <TextField 
                    fullWidth 
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{ sx: { backgroundColor: '#c8e6c9', borderRadius: 2 } }}
                />

                <TextField 
                    fullWidth 
                    label="Teléfono"
                    variant="outlined"
                    margin="normal"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)} // Añadido para teléfono
                    InputProps={{ sx: { backgroundColor: '#c8e6c9', borderRadius: 2 } }}
                />

                <TextField 
                    fullWidth 
                    label="Contraseña"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <TextField 
                    fullWidth 
                    label="Confirmar contraseña"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

                <Button 
                    fullWidth 
                    variant="contained"
                    onClick={handleRegister}
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

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    ¿Ya tienes una cuenta? <a href="/login" style={{ color: '#1b5e20', fontWeight: 'bold', textDecoration: 'none' }}>Inicia sesión</a>
                </Typography>
            </Paper>
        </Box>
    );
}
