
const Scaffold = require('scaffold-generator')
const mustache = require('mustache')

function doGenerateSacaffond(data, template, destination) {

    mustache.escape = v => v


    new Scaffold({
        data: data,
        override: false,
        // function `options.render` accepts `str` and `data`, then returns a `str`
        render: mustache.render
    })
        .copy(template, destination)
        .then(() => {
            // console.log(`Copy from ${template} to ${destination}`)
        })

}





const titleCase = (s) =>
    s
        .split("_")
        .filter(x => x.length > 0)
        .map((x) => (x.charAt(0).toUpperCase() + x.slice(1)))
        .join("");

const camelToSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');

module.exports = {
    doGenerateSacaffond,
    titleCase,
    camelToSnakeCase

}