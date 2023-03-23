import axios from "axios";
import {  useSnackbar } from 'notistack';
import { Apis } from "../API/apis.json";
import { ApiConfig } from "../API/apiConfig.json";


const cfg =ApiConfig.API.base,
ssl=cfg.ssl ? "https://":"http://",
domain = cfg.domain.dev,
port = cfg.port,
endpoint = cfg.endpoint,
version = cfg.version,
BASEURL = ssl+domain+":"+port+endpoint+version,
apiAddr = Apis.adress.user;

export default function Helper(){



 
    const { enqueueSnackbar } = useSnackbar();
      async function getUrlData(h,url,callback) {
      
        await axios.get(url, { headers:h })
        .then(response => response.data)
          .then((data) => {
             callback(data)
        })
        .catch(error => {
          enqueueSnackbar('Bağlantı hatası. İnternet bağlantınızı kontrol edin.', { variant: 'error' })
       });
         
  
        }
  
      async function postUrlData(h,url,context,callback) {
        console.log(h)
        await  axios
        .post(url, context, { headers:h})
        .then((response) => {
          callback(response.data);
        })
        .catch(error => {
          enqueueSnackbar('Bağlantı hatası. İnternet bağlantınızı kontrol edin.', { variant: 'error' })
       });
      }
  
      async function putUrlData(h,url,context,callback) {
       
        await  axios
        .put(url, context, { headers:h})
        .then((response) => {
          callback(response.data);
        })
        .catch(error => {
          enqueueSnackbar('Bağlantı hatası. İnternet bağlantınızı kontrol edin.', { variant: 'error' })
       });
      }
  
      async function delUrlData(h,url,callback) {
       console.log(url)
        await  axios
        .delete(url,{headers:h})
        .then((response) => {
          callback(response.data);
        })
        .catch(error => {
          enqueueSnackbar('Bağlantı hatası. İnternet bağlantınızı kontrol edin.', { variant: 'error' })
       });
      }
  
      function ApiEngine(h,url,type,data,callback) {

  
        switch (type) {
          case "POST":
            postUrlData(h,url,data,callback)
            break;
            case "GET":
              getUrlData(h,url,callback)
            break;
            case "PUT":
              putUrlData(h,url,data,callback)
            break;
            case "DELETE":
              delUrlData(h,url,callback)
            break;
        
          default:
            break;
        }
      }
  
      function AlertMessage(msg,code) {
        switch (code) {
          case 0:
            enqueueSnackbar(msg, { variant: 'success' })
            break;
            case 1:
              enqueueSnackbar(msg, { variant: 'error' })
            break;
            case 2:
              enqueueSnackbar(msg, { variant: 'warning' })
            break;
        
          default:
            break;
        }
      }

  function Login(h,data,callback) {
   let url =  BASEURL+apiAddr.login.name,
    type =  apiAddr.login.type
    ApiEngine(h, url, type ,data,(res)=>{
      AlertMessage(res.msg,res.code)
      callback(res.data)
    })
  }

  function AddUser(h,data,callback) {
    let url =  BASEURL+apiAddr.Adduser.name,
     type =  apiAddr.Adduser.type
     ApiEngine(h, url, type ,data,(res)=>{
       AlertMessage(res.msg,res.code)
       callback(res.data)
     })
   }

   function ListUser(h,data,callback) {
    let url =  BASEURL+apiAddr.Getuser.name,
     type =  apiAddr.Getuser.type
     ApiEngine(h, url, type ,data,(res)=>{
       AlertMessage(res.msg,res.code)
       callback(res.data)
     })
   }

   function PutUser(h,data,callback) {
    let url =  BASEURL+apiAddr.Updateuser.name,
     type =  apiAddr.Updateuser.type
     ApiEngine(h, url, type ,data,(res)=>{
       AlertMessage(res.msg,res.code)
       callback(res.data)
     })
   }

   function DelUser(h,data,callback) {
    let url =  BASEURL+apiAddr.Deleteuser.name,
     type =  apiAddr.Deleteuser.type
     ApiEngine(h, url, type ,data,(res)=>{
       AlertMessage(res.msg,res.code)
       callback(res.data)
     })
   }

    return{
      Login,AddUser,ListUser,PutUser, DelUser
        }

}



