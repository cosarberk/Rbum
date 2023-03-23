"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rbum = void 0;
var js_sha256_1 = require("js-sha256");
var md5_1 = __importDefault(require("md5"));
var aes256 = require('aes256');
var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
var userdata_1 = require("../localDB/userdata");
dotenv.config();
//şifrelemeler için yardımcı sınıf
// bu sınıf yerine bcrypt gibi hazır kütüphanelerde kullanılabilir.
var DataToKey = /** @class */ (function () {
    function DataToKey() {
    }
    DataToKey.prototype.SHA256 = function (d) {
        return (0, js_sha256_1.sha256)(d);
    };
    DataToKey.prototype.MD5 = function (d) {
        return (0, md5_1.default)(d);
    };
    DataToKey.prototype.AES256 = function (d, type) {
        // type 1 şifreleme
        //type 0 çözme
        var req;
        var key = process.env.JWTSTATICKEY;
        if (type === 1) {
            //let buffer = Buffer.from(d);
            req = aes256.encrypt(key, d);
        }
        else {
            req = aes256.decrypt(key, d);
        }
        return req;
    };
    DataToKey.prototype.HS256 = function (d, type) {
        // type 1 şifreleme
        //type 0 çözme
        var re;
        var key = process.env.JWTSTATICKEY;
        if (type === 1) {
            re = jwt.sign(d, key, { algorithm: 'HS256' });
        }
        else {
            jwt.verify(d, key, function (error, decoded) {
                if (error)
                    //console.log(error)
                    re = "Beklenmeyen bir hatayla karşılaşıldı " + error;
                else {
                    re = decoded;
                }
            });
        }
        return re;
    };
    return DataToKey;
}());
// gelen kullanıcı bilgilerini birleştirip md5 ile hasler ve databasede mtoken ile kıyaslar
var Rbum = /** @class */ (function (_super) {
    __extends(Rbum, _super);
    function Rbum(rcode) {
        var _this = _super.call(this) || this;
        _this.rcode = "*BERK*";
        return _this;
    }
    // veritabanını userdata.ts dosyası içindeki object array ile simüle ettiğimiz için
    // veritabanı içinde aramamızı manipüle edecek arama fonksiyonu
    // kullanıcı bulunursa bize kullanıcın array indexini dönecek kullanıcı yoksa -1 dönecek
    Rbum.prototype.FindUser = function (mtoken) {
        var r = -2;
        for (var i = 0; userdata_1.user.length > i; i++) {
            if (userdata_1.user[i].mtoken === mtoken) {
                r = i;
                return r;
            }
            else {
                r = -1;
            }
        }
        return r;
    };
    Rbum.prototype.CreateMToken = function (username, userpassword) {
        return _super.prototype.MD5.call(this, username + this.rcode + userpassword);
    };
    // Kullanıcının varlığı sorgulanır
    //kullanuıcı varsa user objesi döner yoksa boş döner.
    Rbum.prototype.IsThereAUser = function (mtoken) {
        var req;
        // bu fonksiyonu zaten findeuser içindede düzenleyebilirdik ama
        // manipüle fonksiyon olduğu için ayrı yazıyorum
        // normalde buraya zaten bir SELECT sorgusu yazabilirsiniz.
        var i = this.FindUser(mtoken);
        if (i !== -1) {
            userdata_1.user[i].mtoken === mtoken ? req = { data: userdata_1.user[i], code: 0, msg: "" } : req = { data: {}, code: 1, msg: "token bulunamadı" };
        }
        else {
            req = { data: {}, code: 1, msg: "Kullancı Bulunamadı" };
        }
        //console.log(req)
        return req;
    };
    // Kullanıcı giriş yaptığında geçici jwt tokenı üretip döner.
    Rbum.prototype.CreateTemponaryJWT = function (username, userpassword) {
        var user = this.IsThereAUser(this.CreateMToken(username, userpassword));
        var userJWTtoken;
        if (user.code !== 1) {
            var u = user.data;
            var ujwt = {
                id: u.id,
                name: u.muser,
                email: u.email,
                mtoken: u.mtoken,
                role: u.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                issuer: "www.relteco.com"
            };
            userJWTtoken = { data: _super.prototype.HS256.call(this, ujwt, 1), code: 0, msg: "Giriş Başarılı" };
            //console.log(userJWTtoken)
        }
        else {
            userJWTtoken = user;
        }
        return userJWTtoken;
    };
    //jwt yi çözümleyip user jwt nesnesini döner
    Rbum.prototype.ControlTemponaryJWT = function (jwt) {
        return _super.prototype.HS256.call(this, jwt, 0);
    };
    Rbum.prototype.Login = function (username, userpassword) {
        return this.CreateTemponaryJWT(username, userpassword);
    };
    return Rbum;
}(DataToKey));
exports.Rbum = Rbum;
