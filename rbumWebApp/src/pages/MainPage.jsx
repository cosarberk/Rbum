import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {  useSnackbar } from 'notistack';
import Skeleton from '@mui/material/Skeleton';



export default function MainPage() {

  const { enqueueSnackbar } = useSnackbar();
  const storage = useLocalStorage('user')[0]
  console.log(storage)

  const [loading, setloading] = useState(true);

  return (
    <Container maxWidth="sm" >
            
      <Typography align='center' variant="h7" component="h2">
        Yandaki menüde bulunan butonlara tıklayarak 
        Giriş yaptığın Kullanıcı yetkilerini test edebilirsin.
      </Typography>
      <Typography align='center' variant="body" component="p">
       Giriş yapmış olduğun <span style={{color:"orange",fontWeight:"bold"}} > {storage.name} </span> kullanıcı adına ait
      </Typography>
      <Typography  align='center' variant="body" component="p">
         1 saatlik   jwt token
      </Typography>
      <Box sx={{ textAlign:'center',display:'flex',backgroundColor:'#555',p:1,alignItems:'center',justifyContent:'center',borderRadius:2,fontSize:12,color:'orange',whiteSpace:'nowrap',overflow:'auto'}} >

        {storage.jwt}
      </Box>
      <Typography  align='center' variant="body" component="p">
         <a target={"_blank"} style={{color:"aqua"}} href='https://jwt.io' >Buraya Tıklayarak jwt.io dan token kontrol edebilirsin</a>
      </Typography>
      <Typography  align='center' variant="body" component="p">
         <a target={"_blank"} style={{color:"aqua"}} href='https://github.com/cosarberk/Rbum' >Bu projenin kodlarını kurcalamak istermisin hadi tıkla</a>
      </Typography>
      <Typography  mt={2} align='center' variant="h4" component="h2">
        Örnek Listeleme Ekranı
      </Typography>


    {

  loading ?   <Box>
<Skeleton sx={{marginTop:1}} animation="wave" variant="rounded"  height={60} />
<Skeleton sx={{marginTop:1}} animation="wave" variant="rounded"  height={60} />
<Skeleton sx={{marginTop:1}} animation="wave" variant="rounded"  height={60} />
</Box>

:null

    }  



    </Container>
  
  )
}
