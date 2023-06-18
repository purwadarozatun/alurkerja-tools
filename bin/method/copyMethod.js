
const mustache = require('mustache')
const yargs = require('yargs')
const {doGenerateSacaffond} = require('../helper/GenerateHelper.js')

const operation =  (json, withTemplate) => {
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
  
  
  
  
    Object.keys(scaffond_config).forEach(function (key, index) {
      const data = scaffond_config[key]
  
      var formatTo = mustache.render(data['to'], params)
  
      doGenerateSacaffond(params, withTemplate + "/" + data["from"], formatTo)
    });
  
  
  
  
    var afterMessage = mustache.render(json['after_generate_message'], params)
    console.log(afterMessage)
  
  }

  module.exports =  operation;