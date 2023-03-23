




export class MenuDB {

    // yetki değerini döner
    // a role alır
    //b yetkki indeksini alır
    // 4 haneli rol için index anlamları
    // 0 = okuma
    // 1 = yazma
    // 2 = güncelleme
    // 3 = silme
    SPLIT(a: string, b: number) {
        return a.split("")[b]
    }
    // yetki değerine göre yetkinin olup olmadığını döner
    AUTH(role: number, i: number): boolean {
        let y = this.SPLIT(role.toString(), i), s: boolean;
        parseInt(y) > 0 ? s = true : s = false
        return s;
    }
    INSERT(user: any) {
        let res: { code: number, msg: string, data: any };
        if (this.AUTH(user.role, 1)) {
            res = { code: 0, msg: "Kayıt işlemi İçin Yetkiniz Var", data: {} }
        } else {
            res = { code: 1, msg: "Kayıt İşlemi için Yetkiniz Yok", data: {} }
        }
        return res
    }

    SELECT(user: any) {
        let res: { code: number, msg: string, data: any };
        if (this.AUTH(user.role, 2)) {
            res = { code: 0, msg: "Okuma işlemi İçin Yetkiniz Var", data: {} }
        } else {
            res = { code: 1, msg: "Okuma İşlemi için Yetkiniz Yok", data: {} }
        }
        return res
    }
    UPDATE(user: any) {
        let res: { code: number, msg: string, data: any };
        if (this.AUTH(user.role, 3)) {
            res = { code: 0, msg: "Güncelleme işlemi İçin Yetkiniz Var", data: {} }
        } else {
            res = { code: 1, msg: "Güncelleme İşlemi için Yetkiniz Yok", data: {} }
        }
        return res
    }
    DELETE(user: any) {
        let res: { code: number, msg: string, data: any };
        if (this.AUTH(user.role, 4)) {
            res = { code: 0, msg: "Silme işlemi İçin Yetkiniz Var", data: {} }
        } else {
            res = { code: 1, msg: "Silme İşlemi için Yetkiniz Yok", data: {} }
        }
        return res
    }

}
