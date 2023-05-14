import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const TopNavigationBar: React.FC = () => {
  const menuItems = [
    {
      label: 'Chat',
      link: '/',
    },
    {
      label: 'Study',
      link: '/study',
    },
    {
      label: 'Translate',
      link: '/trans',
      subMenu: [
        {
          label: 'Instruct translate',
          link: '/trans/instruct',
        },
      ],
    },
    {
      label: 'Polish',
      link: '/polish',
      subMenu: [
        {
          label: 'Polish Latex',
          link: '/polish/latex',
        },
      ],
    },
    {
      label: 'Rewrite',
      link: '/rewrite',
      subMenu: [
        {
          label: 'Template rewrite',
          link: '/rewrite/template',
        },
        {
          label: 'Instruct rewrite',
          link: '/rewrite/instruct',
        },
      ],
    },
    {
      label: 'Functions',
      link: '',
      subMenu: [
        {
          label: 'test',
          link: '/test',
        },
      ],
    },
  ];

  const [submenuAnchorEls, setSubmenuAnchorEls] = React.useState<
    (null | HTMLAnchorElement)[]
  >([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleSubmenuOpen = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ): void => {
    submenuAnchorEls[index] = event.currentTarget;
    setSubmenuAnchorEls([...submenuAnchorEls]);
  };

  const handleSubmenuClose = (index: number): void => {
    submenuAnchorEls[index] = null;
    setSubmenuAnchorEls([...submenuAnchorEls]);
  };

  const handleMenuItemEnter = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const handleMenuItemLeave = () => {
    setSelectedIndex(-1);
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GPT Box
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {menuItems.map((item, index) => (
            <Button
              component={Link}
              to={item.link}
              color="inherit"
              onMouseEnter={(event) => {
                handleSubmenuOpen(event, index);
                handleMenuItemEnter(event, index);
              }}
              onMouseLeave={() => {
                handleSubmenuClose(index);
                handleMenuItemLeave();
              }}>
              {item.label}
              {/* {item.subMenu && (
                <Menu
                  anchorEl={submenuAnchorEls[index]}
                  open={selectedIndex === index}
                  onClose={() => {
                    handleSubmenuClose(index);
                    handleMenuItemLeave();
                  }}
                  elevation={0}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                  {item.subMenu.map((subItem) => (
                    <MenuItem
                      component={Link}
                      to={subItem.link}
                      onClick={() => handleSubmenuClose(index)}>
                      {subItem.label}
                    </MenuItem>
                  ))}
                </Menu>
              )} */}
            </Button>
          ))}
        </Box>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <List sx={{ width: 250 }}>
            {menuItems.map((item, index) => (
              <ListItem
                component={Link}
                to={item.link}
                onClick={toggleDrawer(false)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigationBar;
