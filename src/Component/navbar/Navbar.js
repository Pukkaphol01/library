import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{height:'100px'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={showSidebar}
          >
            <MenuIcon sx ={{flexGrow:1}}  style={{fontSize:'40px',marginRight:'5px',marginTop:'15px'}} />
          </IconButton>
          <Typography variant="h4" component="div" style={{fontWeight:'800',marginTop:'15px'}} sx={{ flexGrow: 1 }}>
            Library
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} >
          <ul className='nav-menu-items' onClick={showSidebar} >
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
    </Box>
  );
}