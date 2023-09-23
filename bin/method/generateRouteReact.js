const { default: axios } = require('axios')
const mustache = require('mustache')
const yargs = require('yargs')
const { doGenerateSacaffond, titleCase, camelToSnakeCase } = require('../helper/GenerateHelper.js')
/**
 *
 * @param {*} json json diambil dari conf.json dari folder template
 * @param {*} withTemplate
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
        console.log('success getting spec')
        const spec = response.data.data

        if (spec.is_bpmn) {
          params = {
            ...params,
          }

          var routesFormatTo = mustache.render(scaffond_config['routes']['to'], params)

          console.log('Geneate Routes ' + spec.name)
          doGenerateSacaffond(params, withTemplate + '/' + scaffond_config['pages']['from'], routesFormatTo)

          spec.usertask_mapping.forEach((item) => {
            console.log(item)
            params = {
              pageName: item.id,
              baseUrl: params.baseUrl,
              specPath: item.url,
            }

            console.log('Geneate Pages ' + spec.name)
            doGenerateSacaffond(params, withTemplate + `/${item.id}` + scaffond_config['pages']['from'], pagesFormatTo)
            console.log('done')
          })
        }
      }
    })
    .catch((error) => {
      console.log('gagal mendapatkan spec')
    })
  // .finally(() => {
  //   var afterMessage = mustache.render(json['after_generate_message'], params)
  //   console.log(afterMessage)
  // })
}

module.exports = operation
