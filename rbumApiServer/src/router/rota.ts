import { Rbum as UM } from '../rbum'
import { sha256 } from 'js-sha256'
const Um = new UM();
import { MenuDB } from '../localDB/localDB'


const menudb = new MenuDB()
// Login işlemi
const Login = (req: any, res: any) => {

    let u = req.body.user,
        p = req.body.pass,
        T = Um.Login(u, p);
    res.send(T)

}

// jwt yi çözümler
const GetAuth = (jwt: any) => {
    return Um.ControlTemponaryJWT(jwt);
}

// çözülen jwtden kullanıcı id sini ve rolünü döner
const GetLevel = (jwt: string) => {
    let JWT = GetAuth(jwt);
    return { uid: JWT.id, role: JWT.role }
}


//const jwt = req.body.token || req.query.token || req.headers["x-access-token"];
//let jwt = req.headers.authorization.split(" ")[1] // split ile bölünüp Bearer tagını devredışı bırakılır

const GetUser = (req: any, res: any) => {
    res.send(menudb.SELECT(GetLevel(req.headers.authorization.split(" ")[1])))
}

const AddUser = (req: any, res: any) => {
    res.send(menudb.INSERT(GetLevel(req.headers.authorization.split(" ")[1])))
    //GetLevel(req)
}

const PutUser = (req: any, res: any) => {
    res.send(menudb.UPDATE(GetLevel(req.headers.authorization.split(" ")[1])))
}

const DelUser = (req: any, res: any) => {
    res.send(menudb.DELETE(GetLevel(req.headers.authorization.split(" ")[1])))
}




module.exports = {
    Login,
    AddUser,
    GetUser,
    PutUser,
    DelUser
}
