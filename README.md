# Rbum
nodejs ,react,typescript,javascript user management example

## Rbum Nedir?

Rbum Relteco basic user management example
temel kullanıcı yönetimi için full-stack bir örnek olmasını amaçladığım bir react-nodejs projesidir.
Projenin mimarını işlemlerin temel anlamda yapılabilmesini göstermek amacıyla oluşturdum, geliştirmek,
düzenlem ya da değiştirmek sizin elinizde.

## Neler Elde ediceksiniz ?

### back-end tarafında;

- şifreleme yöntemlerini
- express ile rest api yönetimini
- temel post, get,put,delete işlemlerini
- jwt token işlemlerini
- Kullanıcı rol ve yetki yönetimini
- genel olarak nodejs üzerinde sınıf,modül,fonksiyon v.b yapılarını

### front-end tarafında;

- metarial-ui
- axios ile headers 'lı istek işlemleri (api ile token gönderme gibi ) 
- router-dom ile sayfalamayı ( Kullanıcı giriş yaptıktan sonra login sayfasına dönemeyecek şekilde )
- react hooks yazmayı ( kullanıcının giriş ve çıkış işlemlerine göre davranış yaptırmayı )
- react 'ta layout ve outlet yapısını
- özel komponent oluşturmayı
- react global state örnekler (useState,useEffect v.s)
- dark mode ve light mode gibi özel temanızı oluşturmayı



## Nasıl Çalışıyor ?
- Öncelikle bunun basit bir mimari olduğunu aklınızdan çıkarmayarak başlayalım.
- kullanıcının kullanıcı adı ve şifresi ile kayıt olduğu ve kayıt olurkende şifresinin veritabanına
sha256 ile hash'lendiği varsayılarak başlıyoruz.buna ek olarak kayıt edilirken de kullanıcı adı + Bireysel kod + sha256 ile hash li şifre birleştirilip md5 ile hash edilip kullanıcı tbalosuna md5 ile hash edilmiş şekilde mtoken olarak kayıt edilmiş olması gerekli,
#### Peki Neden ? 
burdaki amacım yeni kayıt edilirken ya da giriş yapılıken kullanıcının varlığı sorgulandığında hız kazanmak oldu. şifreyi md5 ile tutmak güvenlik açığı yaratabilirdi o yüzden sha256 ile hashledik buda her ne kadar sha md5 ten daha güvenli olsada algortima olarak md5 kadar hızlı değildir.
bu yüzden veri tabanında sorgulama işlemi kullanıcı adı ve şifre ile teyitlenerek yapılmaktansa md5 li mtoken ile yapılması bize daha hız kazandırmış oldu.Tabikide md5 te yeteri kadar benzersiz bir hash çıkarttığı için çakışma konusunda içimiz rahat olacak.
belki ilerleyen zamanlarda kayıt ekranınıda eklerim.
- kullanıcı giriş yapmak istediğinde server a kullanıcı adı ve sha256 ile hash edilmiş şekilde bilgiler gönderiliyor
- rbum kullanıcı adını  özel kodu ve şifreyi birleştirerek mtoken ı yeniden elde edip veri tabanında (şu an için örnek json objemizde) eşini arayarak 
kullanıcının var olup olmadığına bakıyor.
- serverı her işlem sonucu olarak kullanıcıya  {code:number,data:{},msg:string} şeklinde bir obje dönecek şekilde ayarladım. (resposive lerinizin  obje olarak dönmesi her zaman iyidir. :)) )
- Örneğin kullanıcı login olmak istediğin varlığı kontrol edildikten sonra mktoken sorgusundan bize dönen user objesinden id , kullanıcı adı gibi bilgileri alıp bu veriden bir jwt token oluşturulup kullanıcıya geri dönülüyor. ve Ön yüzde jwt geldiğinde önceden yazdığımız login hooks u ile kullanıcın jwt değerini localstoragete (tarayıcının hafızasında ) saklamaya başlıyoruz. demo sitesinde size gtösterilen token ı kopyalayıp jwt.io sitesinde inceleyebilirsiniz.
- peki napıyoruz bu jwt ile ... ön yüzden her gönderdiğimiz sorguda kullanıcı bilgilerini jwt olarak server a gönderiyor server da bu jwt yi çözümlüyor ve çıkan objeden kullanıcın rolü nü ya da yetkisine bakıyor sonrasında bu kullanıcının bu sorguyu yapıp yapamayacağını öğreniyor ve sonunda ya hata mesajı ya da sorgu sonucunu kullanıcıya gönderiyoruz.
- kullanıcı çıkış yaptığında ise yine hooks larımız sayesinde bunu dinlemekte oluyor ve çıkış işleminde localstorage teki bilgileri siliyoruz. bu bilgiler silindiğinde tüm projede sarmalayabildiğimiz provider ımız sağolsun hangi sayfada olursak olalım bunu anlıyor ve bizi login sayfasına atıyor.İstenildiğinde bunun terside geçerlidir yani çıkış yapmadığımız sürece tarayıcıya url olarak bile girsek yinede login sayfasına ulaşamayız.





## hadi linux a gel boşver postman gibi uygulamaları terminal candır :)))
## projedeki istekleri manipüle etmek için işte örnek curl komutları 

### login işlemi
kullanıcı varsa sonuç olarak bize jwt token dönecek
```
   curl -d '{"user":"berk", "pass":"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"}' -H "Content-Type: application/json" -X POST http://localhost:4050/berkcosar/v1/Login

```

### örnek get isteği

```
TOKEN=yukarıdaki token
curl -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" http://localhost:3000/berkcosar/v1/GetUser
```

### örnek post işlemi

```
TOKEN=yukarıdaki token 
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -H "Authorization: Bearer ${TOKEN}" -X POST http://localhost:3000/berkcosar/v1/AddUser


```
### örnek put işlemi

```
TOKEN=yukarıdaki token
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -H "Authorization: Bearer ${TOKEN}" -X PUT http://localhost:3000/berkcosar/v1/UpdateUser

```


### örnek delete işlemi

```
TOKEN=yukarıdaki token
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -H "Authorization: Bearer ${TOKEN}" -X DELETE http://localhost:3000/berkcosar/v1/DelUser

```

