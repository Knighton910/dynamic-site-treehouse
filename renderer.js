/**
 * Created by keltheceo on 4/15/15.
 */
var fs = require('fs');

function mergeValues(values, content) {
    //cycle over the keys

    for (var key in values) {
    //Replace all {{key}} with the value
        content = content.replace('{{' + key +' }}', values[key]);
    }

    //return merged content
    return content;
}

function view(templateName, values, res){

    var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf8'});
    // Insert values into the content
    fileContents = mergeValues(values, fileContents);


    // write contents to response.
    res.write(fileContents);
}

module.exports.view = view;