# alurkerja-tools

## Alurkerjatools
adalah cli command yang di gunakan untuk membuat scaffonding sebuah aplikasi dengan command `npx alurkerja-tools crud --template {{template yang di gunakan / ada di fol}}`  


## Carapembuatan template 

Pada folder  `bin/template` terdapat beberapa folder template yang bisa di gunakan bisa di lihat di bawah ini: 
![image](https://github.com/purwadarozatun/alurkerja-tools/assets/8139599/0c2c03ed-68ac-4374-9f4b-305d63e7becc)

Untuk membuat template baru  silahkan tambahkan folder baru dengan context yang sesuai dengan template yang akan kita gunakan
setelah itu buatlah file `conf.json` dengan isi kurang lebih seperti di bawah ini 

```
{
    "parameter": [
        "Crud",
        "module"
    ],
    "method": "copyMethod",
    "scaffond_config": {
        "controller": {
            "from": "controller",
            "to": "./resources/js/components/Crud/Api/controller"
        },
        "service": {
            "from": "service",
            "to": "./resources/js/components/Crud/Api/service"
        }
    },
    "after_generate_message" : "Oke siap ,  wes ta generatein crudne {{Crud}} di module {{module}}"
}
```

### Penjelasan
pada file conf.json  terdapat beberapa object yaitu 
1. Parameter
Parameter yang di gunakan untuk mengeksekusi command dari template yang sudah  di definisikan sehingga user akan diberikan informasi terkait dengan parameter required yang sudah di definisikan di parameter

3. method
method/ metode yang di gunakan method ini di daftarkan pada folder method  yang berisi file js 
4. scaffold_config

Parameter config berisi  object dari operasi yang di buat ,  contoh  controller akan mengeksekusi copy dari field `from`  ke field `to`

6. after_generate_message

Message yang akan dimunculkan ketika command selesai di exsekusi  bertujuan untuk memberikan informasi  
