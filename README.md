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

Penjelasan 
