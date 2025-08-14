import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { Link, useLocation } from 'react-router-dom';


interface NavProps {
  openNav: boolean;
  onCloseNav: () => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

interface NavItemType {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const NAV_WIDTH = 280;
const NAV_COLLAPSED_WIDTH = 80;

// Mock data for nav
const navItems: NavItemType[] = [
  { title: 'Home', path: '/', icon: <HomeIcon /> },
  { title: 'About', path: '/about', icon: <InfoIcon /> },
];

const settingsItem: NavItemType = {
  title: 'Settings',
  path: '/settings',
  icon: <SettingsIcon />,
};

const Nav: React.FC<NavProps> = ({ openNav, onCloseNav, collapsed, setCollapsed }) => {
  const upLg = true; // simulate large screen — no responsive hook

  // Dummy effect to close nav on route change (not used here)
  useEffect(() => {
    if (openNav) onCloseNav();
  }, [openNav, onCloseNav]);



// ...

const renderNavItem = (item: NavItemType) => {
  const location = useLocation();
  const active = location.pathname === item.path;

  return (
    <ListItemButton
      key={item.title}
      component={Link}
      to={item.path}             
      sx={{
        minHeight: 44,
        borderRadius: 1,
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: 2,
        typography: 'body2',
        color: active ? 'primary.main' : 'text.secondary',
        fontWeight: active ? 'bold' : 'medium',
        bgcolor: active ? (theme) => alpha(theme.palette.primary.main, 0.1) : 'transparent',
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        },
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: collapsed ? 0 : 2 }}>
        {item.icon}
      </Box>
      {!collapsed && <Typography variant="body2">{item.title}</Typography>}
    </ListItemButton>
  );
};


  const renderContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      {/* Logo placeholder + Collapse button */}
      <Box sx={{ position: 'relative', mb: 4 }}>
        <Box sx={{ ml: collapsed ? 1 : 2 }}>
          <Typography variant="h6">Logo</Typography>
        </Box>

        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            position: 'absolute',
            top: 0,
            right: -16,
            backgroundColor: 'background.paper',
            borderRadius: '50%',
            boxShadow: 2,
            zIndex: 10,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      {/* Nav items */}
      <Stack spacing={1}>
        {navItems.map(renderNavItem)}
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      {/* Settings at bottom */}
      {renderNavItem(settingsItem)}
    </Box>
  );

  return (
    <Box
      sx={{
        flexShrink: 0,
        width: { lg: collapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH },
        transition: 'width 0.3s ease',
      }}
    >
      {upLg ? (
        <Box
          sx={{
            left: 0, // 👈 force it to be on the left edge
    top: 0, 
            height: '100vh',
            position: 'fixed',
            width: collapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH,
            borderRight: (theme) => `1px dashed ${theme.palette.divider}`,
            bgcolor: 'background.default',
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Nav;
