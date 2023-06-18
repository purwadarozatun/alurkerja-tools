
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

const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

module.exports = {
    doGenerateSacaffond,
    titleCase,
    camelToSnakeCase

}