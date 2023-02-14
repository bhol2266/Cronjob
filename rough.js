const fs = require('fs');

fs.readFile('./storymodels.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    const jsonArray = JSON.parse(data);

    var array = []


    jsonArray.forEach(element => {
        const newDescip = element.description.toString().substring(0, 100);

        element.description = newDescip
        array.push(element)

    });

    fs.writeFileSync('storymodels.json',  JSON.stringify(array));

});
