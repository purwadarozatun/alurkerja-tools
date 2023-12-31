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



  var params = {}
  var valid = true

  json.parameter.forEach(function (value) {
    const param = yargs.argv[value]

    if (!param) {
      valid = false
      console.log(`Parameter ${value}  tidak boleh kosong`)
    }
    params[value] = param
  })

  if (!valid) {
    return false
  }

  console.log('getting spec...')
  axios
    .get(params.baseUrl + '/' + params.specPath)
    .then((response) => {
      if (response.status === 200) {
        console.log('success getting spec asdsad')
        const spec = response.data.data

        var importStatement =  `import React from "react";\nimport {\n\n`
        var importRoutesStatement =  `const routes = (): { [url: string]: React.ReactNode } => ({\n`
        var importMenuStatement =  `const routes: { [url: string]: Array<string> } = {\n`

        
        
        var exportComponent = ''

        
        


        exportComponent += `export * from './Start${_.startCase(spec.name)}/Start${_.startCase(spec.name)}';\n`
        exportComponent += `export * from './Start${_.startCase(spec.name)}/Start${_.startCase(spec.name)}Create';\n`

        importStatement += `Start${_.startCase(spec.name)},\nStart${_.startCase(spec.name)}Create,\n`
        importRoutesStatement += `   "/${spec.name}": <Start${_.startCase(spec.name)} />,\n`
        importRoutesStatement += `   "/${spec.name}/create": <Start${_.startCase(spec.name)}Create />,\n`
        importMenuStatement += `   "/${spec.name}": ["Start ${_.startCase(spec.name)}", "Magna sunt adipisicing ullamco est ipsum."],\n`

        if (spec.is_bpmn) {
          spec.usertask_mapping.forEach((item) => {
            console.log(item)
            params = {
              usertaskName: _.startCase(item.id),
              baseUrl: params.baseUrl,
              bpmnName: _.startCase(spec.name),
              specPath: item.url,
            }
            var pagesFormatTo = mustache.render(scaffond_config['pages']['to'], params)

            console.log('Geneate Pages ' + spec.name)
            doGenerateSacaffond(params, withTemplate + `/` + scaffond_config['pages']['from'], pagesFormatTo)
            console.log('done') 

            importStatement += `${_.startCase(item.id)},\n`
            importStatement += `${_.startCase(item.id)}Create,\n`

            exportComponent += `export * from './${_.startCase(item.id)}/${_.startCase(item.id)}';\n`
            exportComponent += `export * from './${_.startCase(item.id)}/${_.startCase(item.id)}Create';\n`


            importRoutesStatement += `   "/${item.id}": <${_.startCase(item.id)} />,\n`
            importRoutesStatement += `   "/${item.id}/create": <${_.startCase(item.id)}Create />,\n`


            importMenuStatement += `   "/${item.id}": ["${_.startCase(item.id)}", "Magna sunt adipisicing ullamco est ipsum."],\n`



  

          })


          importStatement += `} from "@/pages/${_.startCase(spec.name)}";`

          importRoutesStatement += `});\nexport default routes;`
          importMenuStatement += `};\nexport default routes;`

          console.log(exportComponent)


          
          console.log(importStatement)
          const routeParams = {
            pageName: spec.name,
            bpmnName : _.startCase(spec.name),
          }


          

          const pagesIndexTo = mustache.render(scaffond_config['pagesindex']['to'], routeParams)
          doGenerateSacaffond({
            importComponent:  exportComponent,
          }, withTemplate + '/' + scaffond_config['pagesindex']['from'] , pagesIndexTo)



          const pagesRouteTo = mustache.render(scaffond_config['routeIndex']['to'], routeParams)
          doGenerateSacaffond({
            importComponent:  importStatement + '\n\n' + importRoutesStatement,
            bpmnName:(spec.name),

          }, withTemplate + '/' + scaffond_config['routeIndex']['from'] , pagesRouteTo)


          const pagesMenuTo = mustache.render(scaffond_config['menuIndex']['to'], routeParams)
          doGenerateSacaffond({
            importComponent:  importMenuStatement,
            bpmnName:(spec.name),

          }, withTemplate + '/' + scaffond_config['menuIndex']['from'] , pagesMenuTo)


          

          const startProcess = mustache.render(scaffond_config['startprocess']['to'], routeParams)
          doGenerateSacaffond({
            bpmnName:_.startCase(spec.name),

          }, withTemplate + '/' + scaffond_config['startprocess']['from'] , startProcess)


          // console.log(routeParams, 'route params', scaffond_config['routes']['to'])

          // var routesFormatTo = mustache.render(scaffond_config['routes']['to'], routeParams)
          // console.log('Geneate Routes ' + spec.name,  routesFormatTo)
          
          // doGenerateSacaffond(routeParams, withTemplate + '/' + scaffond_config['routes']['from'] , routesFormatTo)
        }
      }
    })
    .catch((error) => {
      console.log(error)
      console.log('gagal mendapatkan spec')
    })
  // .finally(() => {
  //   var afterMessage = mustache.render(json['after_generate_message'], params)
  //   console.log(afterMessage)
  // })
}

module.exports = operation
