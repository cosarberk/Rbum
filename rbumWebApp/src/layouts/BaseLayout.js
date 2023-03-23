import React from 'react'
import  Box  from '@mui/material/Box'
import  Avatar  from '@mui/material/Avatar'
import Typography  from '@mui/material/Typography'


export default function BaseLayout({children}) {


    const date = new Date()
   


  return (
    <Box>
        {children}
 <Box sx={{width:'100%',height:30,display:'flex',justifyContent:'center',color:'#ccc',backgroundColor:'#121314',alignItems:'center',position:'fixed',bottom:0,zIndex:888}} >
    <Avatar  sx={{ width: 26, height: 26 }} src='https://berkcosar.com/image/profil.jpg' />
    <Typography sx={{marginLeft:2}} variant='subtitle2' >
    BerkCoşar © { date.getFullYear()}
    </Typography>
     
       </Box>
    </Box>
     
  )
}
