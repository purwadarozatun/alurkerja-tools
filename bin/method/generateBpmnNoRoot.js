
const { default: axios } = require('axios');
const mustache = require('mustache')
const yargs = require('yargs')
const { doGenerateSacaffond, titleCase, camelToSnakeCase, toKebabCase, toPascalCase } = require('../helper/GenerateHelper.js')

const generateBpmnNoRoot = (json, withTemplate) => {
  const scaffond_config = (json.scaffond_config);


  var params = {}
  var valid = true;

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

  axios.get(params.specUrl)
    .then(function (response) {
      // handle success
      const data = (response.data.data);

      if (data.is_bpmn) {

        console.log(titleCase(data.name));
        params = {
          ...params, ...{ bpmn: camelToSnakeCase(data.name) },
        }
        var formatTo = mustache.render(scaffond_config['bpmn']['to'],params)

        console.log("Geneate BPMN " + data.name)
        doGenerateSacaffond(params, withTemplate + "/" + scaffond_config['bpmn']['from'], formatTo)
        data.usertask_mapping.map((item) => {
          params = {
            ...params, 
            ...{
              usertask: toKebabCase(item.id),
              bpmn: camelToSnakeCase(data.name),
            },
          }
          var userTaskTo = mustache.render(scaffond_config['usertask']['to'], params)
          console.log(`Genearting Usertask ${item.id} `)
          doGenerateSacaffond(params, withTemplate + "/" + scaffond_config['usertask']['from'], userTaskTo)
        })
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {

      var afterMessage = mustache.render(json['after_generate_message'], params)
      console.log(afterMessage)
    });



}

module.exports = generateBpmnNoRoot;