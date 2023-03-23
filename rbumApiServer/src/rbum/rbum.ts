import { sha256 } from 'js-sha256';
import md5 from 'md5';
var aes256 = require('aes256');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
import { user } from '../localDB/userdata';
dotenv.config();

//şifrelemeler için yardımcı sınıf
// bu sınıf yerine bcrypt gibi hazır kütüphanelerde kullanılabilir.
class DataToKey {
    SHA256(d: any) {
        return sha256(d)
    }
    MD5(d: any) {
        return md5(d)
    }
    AES256(d: any, type: number) {
        // type 1 şifreleme
        //type 0 çözme
        let req: string;
        let key = process.env.JWTSTATICKEY;
        if (type === 1) {
            //let buffer = Buffer.from(d);
            req = aes256.encrypt(key, d)
        } else {
            req = aes256.decrypt(key, d);
        }
        return req;
    }
    HS256(d: any, type: number): any {
        // type 1 şifreleme
        //type 0 çözme
        var re: any;
        let key = process.env.JWTSTATICKEY;
        if (type === 1) {
            re = jwt.sign(d, key, { algorithm: 'HS256' });
        } else {
            jwt.verify(d, key, (error: any, decoded: any) => {
                if (error)
                    //console.log(error)
                    re = "Beklenmeyen bir hatayla karşılaşıldı " + error
                else {

                    re = decoded
                }
            });
        }
        return re;

    }
}


// gelen kullanıcı bilgilerini birleştirip md5 ile hasler ve databasede mtoken ile kıyaslar


export class Rbum extends DataToKey {
    rcode: string;
    constructor(rcode?: string) {
        super();
        this.rcode = "*BERK*";
    }


    // veritabanını userdata.ts dosyası içindeki object array ile simüle ettiğimiz için
    // veritabanı içinde aramamızı manipüle edecek arama fonksiyonu
    // kullanıcı bulunursa bize kullanıcın array indexini dönecek kullanıcı yoksa -1 dönecek
    FindUser(mtoken: string): number {
        let r: number = -2;
        for (let i = 0; user.length > i; i++) {

            if (user[i].mtoken === mtoken) {
                r = i
                return r
            }
            else {
                r = -1
            }
        }

        return r;
    }

    CreateMToken(username: string, userpassword: string) {

        return super.MD5(username + this.rcode + userpassword)
    }

    // Kullanıcının varlığı sorgulanır
    //kullanuıcı varsa user objesi döner yoksa boş döner.
    IsThereAUser(mtoken: string): any {

        let req: { data: any, code: number, msg: string };
        // bu fonksiyonu zaten findeuser içindede düzenleyebilirdik ama
        // manipüle fonksiyon olduğu için ayrı yazıyorum
        // normalde buraya zaten bir SELECT sorgusu yazabilirsiniz.
        let i = this.FindUser(mtoken)
        if (i !== -1) {
            user[i].mtoken === mtoken ? req = { data: user[i], code: 0, msg: "" } : req = { data: {}, code: 1, msg: "token bulunamadı" };
        } else {
            req = { data: {}, code: 1, msg: "Kullancı Bulunamadı" }
        }
        //console.log(req)
        return req;
    }

    // Kullanıcı giriş yaptığında geçici jwt tokenı üretip döner.
    CreateTemponaryJWT(username: string, userpassword: string): any {
        let user = this.IsThereAUser(this.CreateMToken(username, userpassword))
        let userJWTtoken: any;
        if (user.code !== 1) {
            let u = user.data
            let ujwt = {
                id: u.id,
                name: u.muser,
                email: u.email,
                mtoken: u.mtoken,
                role: u.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),  // 1 saatlik token üretir
                issuer: "www.relteco.com"
            }
            userJWTtoken = { data: super.HS256(ujwt, 1), code: 0, msg: "Giriş Başarılı" }
            //console.log(userJWTtoken)

        } else {
            userJWTtoken = user
        }
        return userJWTtoken;
    }
    //jwt yi çözümleyip user jwt nesnesini döner
    ControlTemponaryJWT(jwt: any): any {
        return super.HS256(jwt, 0)
    }

    Login(username: string, userpassword: string) {
        return this.CreateTemponaryJWT(username, userpassword)
    }





}
