# alurkerja-tools

## Alurkerjatools

cli command yang di gunakan untuk membuat scaffonding sebuah aplikasi dengan command `npx alurkerja-tools crud --template {{template yang di gunakan / ada di fol}}`
apabila terdapat parameter di param `npx alurkerja-tools crud --template {{template yang di gunakan / ada di fol}} --param1=valueparam1`

> untuk parameter dengan key `specPath` contoh value nya api/bpmn/cuti, jika menggunakan /api/bpmn/cuti hasilnya akan error

## Cara Pembuatan template

Pada folder `bin/template` terdapat beberapa folder template yang bisa di gunakan bisa di lihat di bawah ini:
![image](https://github.com/purwadarozatun/alurkerja-tools/assets/8139599/0c2c03ed-68ac-4374-9f4b-305d63e7becc)

> menjalankan command dilocal akan mengambil template dari C:\Users\ASUS\alurkerja-tools\bin\template (windows)

Untuk membuat template baru silahkan tambahkan folder baru dengan context yang sesuai dengan template yang akan kita gunakan
setelah itu buatlah file `conf.json` dengan isi kurang lebih seperti di bawah ini

```json
{
  "parameter": ["Crud", "module"],
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
  "after_generate_message": "Oke siap ,  wes ta generatein crudne {{Crud}} di module {{module}}"
}
```

### Penjelasan

pada file conf.json terdapat beberapa object yaitu

1. Parameter
   Parameter yang di gunakan untuk mengeksekusi command dari template yang sudah di definisikan sehingga user akan diberikan informasi terkait dengan parameter required yang sudah di definisikan di parameter

2. method
   method/ metode yang di gunakan method ini di daftarkan pada folder method yang berisi file js
3. scaffold_config

Parameter config berisi object dari operasi yang di buat , contoh controller akan mengeksekusi copy dari field `from` ke field `to`

6.after_generate_message

Message yang akan dimunculkan ketika command selesai di exsekusi bertujuan untuk memberikan informasi


##  Cara Membuat Template untuk project

cli-template
└── sinergi-bpmn
    ├── conf.json
    ├── helper.js
    ├── index.js
    ├── menuIndex
    │   └── {{bpmnName}}_menus.tsx
    ├── pages
    │   └── {{bpmnName}}
    │       └── {{usertaskName}}
    │           ├── {{usertaskName}}Create.tsx
    │           └── {{usertaskName}}.tsx
    ├── pagesindex
    │   └── index.ts
    ├── routeIndex
    │   └── {{bpmnName}}_components.tsx
    └── startprocess
        └── {{bpmnName}}
            └── Start{{bpmnName}}
                ├── Start{{bpmnName}}Create.tsx
                └── Start{{bpmnName}}.tsx


### Penjelasan

untuk membuat template baru silahkan tambahkan folder baru dengan nama `cli-template` yang di gunakan untuk menyimpan template baru ,   di dalam folder `cli-template` terdapat folder `sinergi-bpmn` yang di gunakan untuk menyimpan template yang akan di gunakan untuk project yang penting dari folder `sinergi-bpmn` adalah file `conf.json` yang di gunakan untuk menyimpan konfigurasi dari template yang akan di gunakan dan juga index.js yang di gunakan untuk mengeksekusi template yang akan di gunakan


file selain `conf.json` dan `index.js` di gunakan untuk menyimpan template yang akan di gunakan untuk project dimana samplenya  ada folder pages yang di gunakan untuk menyimpan template yang akan di gunakan untuk membuat folder pages di project yang akan di buat dan dikonfigurasi di file `conf.json`

untuk index.js di gunakan untuk mengeksekusi template yang akan di gunakan untuk project salah satunya contoh nya  ada di bawah ini

```js

const { default: axios } = require('axios')
const mustache = require('mustache')
const yargs = require('yargs')
const _ = require('lodash')
const { doGenerateSacaffond, titleCase, camelToSnakeCase } = require('./helper.js')
/**
 *
 * @param {*} json json diambil dari conf.json dari folder template
 * @param {*} withTemplate route tempalte
 */
const operation = (json, withTemplate) => {
  const scaffond_config = json.scaffond_config
  // code here
  
}

module.exports = operation

```

pada function operation terdapat 2 parameter yaitu json dan withTemplate , json di ambil dari file conf.json yang di gunakan untuk menyimpan konfigurasi dari template yang akan di gunakan dan withTemplate di gunakan untuk menyimpan route tempalte yang akan di gunakan untuk project

contoh untuk melakukan config 
```js 

          const startProcess = mustache.render(scaffond_config['startprocess']['to'], routeParams)
          doGenerateSacaffond({
            bpmnName:_.startCase(spec.name),

          }, withTemplate + '/' + scaffond_config['startprocess']['from'] , startProcess)
```
dimana `scaffond_config['startprocess']['to']` di gunakan untuk menyimpan route tempalte yang akan di gunakan untuk project dan `scaffond_config['startprocess']['from']` di gunakan untuk menyimpan route tempalte yang akan di gunakan untuk project

### Spec json

```js
{
  "parameter": ["baseUrl", "specPath"],
  "method": "generateRouteReact",
  "scaffond_config": {
    "pages": {
      "from": "pages",
      "to": "src/pages/"
    },
    "pagesindex": {
      "from": "pagesindex",
      "to": "src/pages/{{bpmnName}}"
    },
    "routeIndex": {
      "from": "routeIndex",
      "to": "src/routes"
    },
    "menuIndex": {
      "from": "menuIndex",
      "to": "src/routes"
    },
    "startprocess": {
      "from": "startprocess",
      "to": "src/pages/"
    }
  },
  "after_generate_message": "berhasil generate routes dan pages"
}

```

file tersebut di gunakan untuk menyimpan konfigurasi dari template yang akan di gunakan untuk project berisi scaffond_config yang di gunakan untuk menyimpan route tempalte yang akan di gunakan untuk project dan juga parameter yang di gunakan untuk mengeksekusi command dari template yang sudah di definisikan sehingga user akan diberikan informasi terkait dengan parameter required yang sudah di definisikan di parameter

### Exsekusi  Local 
npx alurkerja-tools local  --template=sinergi-bpmn --baseUrl=https://api-geekacademy.merapi.javan.id --specPath=api/bpmn/cuti/spec

> untuk parameter dengan template di isi  dengan nama folder yang ada di cli-template sedangkan baseUrl dan specPath di isi dengan parameter yang di butuhkan oleh template yang akan di gunakan dan di konfirmasi  di conf.json

