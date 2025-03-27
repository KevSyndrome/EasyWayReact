import React, { useState } from 'react';
import { 
    Box, Paper, Typography, TextField, Button, Divider, IconButton, InputAdornment 
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

export default function PanelLogIn() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, contrasena: password }) // Enviamos `contrasena` en lugar de `password`
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Inicio de sesión exitoso');
            navigate('/dashboard/panel');
        } else {
            alert(data.message);
        }
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
                <img src={`/LogoWay.png`} alt="Easy Way Logo" style={{ width: 120, marginBottom: 16 }} />
                <Typography variant="h5" fontWeight="bold">Inicio de sesión</Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    Inicia sesión con tu cuenta de <span style={{ color: '#ff9800', fontWeight: 'bold' }}>Easy Way</span>.
                </Typography>

                <form onSubmit={handleLogin}>
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

                    <Button 
                        type="submit"
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
                </form>

                <Divider sx={{ my: 2 }} />

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

                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    ¿No tienes una cuenta? <a href="/register" style={{ color: '#1b5e20', fontWeight: 'bold', textDecoration: 'none' }}>Regístrate</a>
                </Typography>
            </Paper>
        </Box>
    );
}
