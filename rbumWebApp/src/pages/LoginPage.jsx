import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../hooks/useAuth";
import DB from '../functions/DB'
import {  useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import { sha256 } from "js-sha256";



export const LoginPage = () => {
  const headers = { "Content-Type": "application/json" }
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();
  const {Login} = DB()
  const navigate = useNavigate(); 



  const handleSubmit = (event) => {
  
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 
    const user = data.get("email")
    const pass = data.get("password")
  
    
     if (user === '' || pass === ''){
      enqueueSnackbar('Boş Alanları Doldurun.', { variant: 'warning' })
     }else{
      let userinfo ={
        user:user,
        pass:sha256(pass)
       }
       
       Login(headers,userinfo,(res)=>{
        if (res!=="") {
          login({jwt:res,name:userinfo.user });
          enqueueSnackbar('Jwt Hafızaya Alındı.', { variant: 'success' })
        }
 })

     }
  

  };

  
  return (
<BaseLayout>
<Container component="main" maxWidth="xs">


<Box
  sx={{
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }}
>
  <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
    <LockOutlinedIcon />
  </Avatar>
  <Typography component="h1" variant="h5">
  Giriş Örneği
  </Typography>
  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email"
      name="email"
      autoComplete="email"
      autoFocus
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Şifre"
      type="password"
      id="password"
      autoComplete="current-password"
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Giriş Yap
    </Button>
   
  </Box>
  {/* <Button
      onClick={()=> navigate("Signup")}
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Kayıt ol
    </Button> */}
</Box>
</Container>
</BaseLayout>

  );
};