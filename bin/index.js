#! /usr/bin/env node
const Scaffold = require('scaffold-generator')
const mustache = require('mustache')
const fs = require('fs')
const yargs = require('yargs')

const axios = require('axios')
const os = require('os')
const { async } = require('regenerator-runtime')
const simpleGit = require('simple-git')

var template = yargs.argv.template
var specUrl = yargs.argv.specurl

var alurkerjaToolsHome = os.homedir + '/alurkerja-tools'

var templateBaseCode = alurkerjaToolsHome + '/bin/template/'
var templateCode = templateBaseCode + template

fs.access(alurkerjaToolsHome, fs.constants.F_OK, async (err) => {
  if (err) {
    console.log('Template Not exsist cloning template')
    await simpleGit().clone('https://github.com/purwadarozatun/alurkerja-tools', alurkerjaToolsHome)
  } else {
    console.log('Teplate Already  Exsist , Updating Template')
    await simpleGit(alurkerjaToolsHome).pull('origin', 'main', { '--rebase': 'true' })
  }

  await fs.access(templateCode, fs.constants.F_OK, async (err) => {
    if (err) {
      console.log(`Template ${template} Not Found   Avaiable Template`)
      console.table(
        fs.readdirSync(templateBaseCode).filter(function (file) {
          return fs.statSync(templateBaseCode + '/' + file).isDirectory()
        })
      )

      return
    } else {
      const withTemplate = templateBaseCode + template
      await fs.readFile(withTemplate + '/conf.json', { encoding: 'utf8' }, async function (err, data) {
        if (err) {
          console.error(err)
          return
        }

        const json = JSON.parse(data)

        const methodName = json['method']
        const method = require('./method/' + methodName + '.js')

        method(json, withTemplate)
      })
    }
  })
})
