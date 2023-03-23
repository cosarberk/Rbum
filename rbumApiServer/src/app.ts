const express = require('express')
const app = express()
const dotenv = require('dotenv');
const Rota = require('./router/rota')
const cors = require('cors')
const bodyParser = require('body-parser')
const ApiVersion: string = "v1"

dotenv.config();
const port = process.env.PORT




app.use(function(req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())



app.get('/', (req: any, res: any) => {
    res.send(`<pre>

<h3> RBUM USER MANAGEMENT EXAMPLE NODE SERVER IS RUNNING
--------------------------------------------------------
| IP     : | localhost                                 |
| PORT   : | ${port}                                      |
| AUTHOR : | Berk COŞAR - lookmainpoint@gmail.com      |
--------------------------------------------------------
<h3>
</pre>  `)
})


//app.get('/Login/:user/:pass', Rota.Login)
app.post(`/berkcosar/${ApiVersion}/Login`, Rota.Login)



// örnek 4 ana db işlemi gerçekleştirlim

//okuma
app.get(`/berkcosar/${ApiVersion}/GetUser`, Rota.GetUser)
// kayıt
app.post(`/berkcosar/${ApiVersion}/AddUser`, Rota.AddUser)
//Güncelleme
app.put(`/berkcosar/${ApiVersion}/UpdateUser`, Rota.PutUser)
// silme
app.delete(`/berkcosar/${ApiVersion}/DelUser`, Rota.DelUser)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
