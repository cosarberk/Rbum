import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate,useOutlet } from "react-router-dom";
import BaseLayout from './BaseLayout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../hooks/useAuth'
import DB from '../functions/DB'
import { useLocalStorage } from '../hooks/useLocalStorage'




const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MainLayout({children}) {
  const {AddUser,ListUser,PutUser, DelUser} = DB()
  const jwt = useLocalStorage('user')[0].jwt
  const headers = { 'Authorization': `Bearer ${jwt}`,"Content-Type": "application/json" }
  const Buttons = [
    { name:'Kullanıcı Ekle', icon:<AddIcon/> ,tag:"Add"},
     { name:'Kullanıcı Listele', icon:<ListIcon/> ,tag:"List"},
     { name:'Kullanıcı Güncelle', icon:<RefreshIcon/>,tag:"Put" },
     { name:'Kullanıcı Sil', icon:<DeleteOutlineIcon/>,tag:"Del" }
 ]


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const outlet = useOutlet()
  const [pageTitle,setpageTitle]=React.useState('Berk Coşar Kullanıcı Yöneitmi')

  const { user,logout} = useAuth()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function ClickButton(tag) {
   switch (tag) {
    case "Add":
      AddUser(headers,{a:"a",b:"b"},(res)=>{console.log(res)})
      break;
      case "List":
        ListUser(headers,{a:"a",b:"b"},(res)=>{console.log(res)})
      break;
      case "Put":
        PutUser(headers,{a:"a",b:"b"},(res)=>{console.log(res)})
      break;
      case "Del":
        DelUser(headers,{a:"a",b:"b"},(res)=>{console.log(res)})
      break;
   
    default:
      break;
   }
  }

  const logOut =()=>{
     logout()
  }


React.useEffect(()=>{
    if(!user)  navigate('/') 
},[user])


  return (
   <BaseLayout>
  <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{height:50,justifyContent:'center'}} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{width:'100%', display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
          <Typography variant="h6" noWrap component="div">
          {pageTitle}
          </Typography>

          <IconButton
            color="inherit"
            onClick={logOut}
          >
            <ExitToAppIcon />
          </IconButton>
          </Box>
       
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Buttons.map((p, index) => (
            <ListItem key={p.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>ClickButton(p.tag)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {p.icon}
                </ListItemIcon>
                <ListItemText primary={p.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 ,paddingRight:3}}>
        <DrawerHeader />
        <Box sx={{flex:1}} >
        {children}
          {outlet}
        </Box>
    
      </Box>
   
    </Box>

   </BaseLayout>
  
  );
}