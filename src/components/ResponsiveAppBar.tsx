import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/modules/UserSlice';

interface ResponsiveAppBarProps {
  usuarioLogadoEmail: string;
}

function ResponsiveAppBar({ usuarioLogadoEmail }: ResponsiveAppBarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCloseUserMenu = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {usuarioLogadoEmail}
          </Typography>

          <Typography
            variant="body2"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {usuarioLogadoEmail}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={handleCloseUserMenu} color="inherit">
              Sair
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
