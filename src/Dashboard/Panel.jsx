"use client";
import React, { useState, useEffect } from 'react'; // Importa React, useState y useEffect correctamente
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid'; // Cambiado a Grid
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavigationIcon from '@mui/icons-material/Navigation';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Menu',
  },
  {
    segment: 'dashboard',
    title: 'Mapa',
    icon: <NavigationIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reportes',
    title: 'Reportes',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'baches',
        title: 'Baches',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = useState(initialPath); 
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

console.log(import.meta.env.VITE_API_KEY);//muestra si se reciben las keys
console.log(import.meta.env.VITE_MAP_ID);

const containerStyle = {//ajustado del contenedor del mapa
  width: '100%',
  height: '87vh', 
};

const infoBoxContainerStyle = {//contenedor de informacion actual y a ir
  display: 'flex',
  gap: '10px',
  position: 'absolute',
  top: '10px',
  left: '10px',
  zIndex: 1000,
};

const infoBoxStyle = { //estilo de la informacion actual y a ir
  backgroundColor: 'black',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
};

export default function Panel(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  const [position, setPosition] = useState({ lat: 20.629, lng: -87.077 });
  const [secondPosition, setSecondPosition] = useState(null);
  const [timeZone, setTimeZone] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  useEffect(() => {
    const fetchTimeZone = async () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${position.lat},${position.lng}&timestamp=${timestamp}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setTimeZone(data);
      } catch (error) {
        console.error('Error fetching time zone:', error);
      }
    };

    fetchTimeZone();
  }, [position]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleMapClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    if (!secondPosition) {
      setSecondPosition({ lat: newLat, lng: newLng });
    } else {
      setPosition({ lat: newLat, lng: newLng });
    }
  };

  const handleRemoveSecondPosition = () => {
    setSecondPosition(null);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {timeZone && (
              <Typography variant="h6" color="textPrimary">
                Time Zone: {timeZone.timeZoneName}
              </Typography>
            )}
            <div style={{ height: "87vh", width: "100%", position: 'relative' }}>
              <div style={infoBoxContainerStyle}>
                <div style={infoBoxStyle}>
                  <Typography variant="h6" color="green">
                    Actual
                  </Typography>
                  <Typography variant="body1" color="green">
                    Lat: {position.lat.toFixed(6)}, Lng: {position.lng.toFixed(6)}
                  </Typography>
                </div>
                {secondPosition && (
                  <div style={infoBoxStyle}>
                    <Typography variant="h6" color="green">
                      A ir
                      <IconButton
                        size="small"
                        onClick={handleRemoveSecondPosition}
                        style={{ color: 'primary', marginLeft: 'auto' }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Typography>
                    <Typography variant="body1" color="green">
                      Lat: {secondPosition.lat.toFixed(6)}, Lng: {secondPosition.lng.toFixed(6)}
                    </Typography>
                  </div>
                )}
              </div>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={15.3}
                onClick={handleMapClick}
              >
                <MarkerF
                  position={position}
                  icon={{
                    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z',
                    fillColor: 'green',
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 2,
                  }}
                />
                {secondPosition && <MarkerF position={secondPosition} />}
              </GoogleMap>
            </div>
          </Grid>
        </Grid>
      </DashboardLayout>
    </AppProvider>
  );
}