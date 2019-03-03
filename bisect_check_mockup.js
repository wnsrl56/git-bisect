const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rd = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, './mockup.json')),
    crlfDelay: Infinity
});

const mockup = [];

rd.on('line', (line) => {
    console.log(line);
    if(!line || line === '') return;
    mockup.push(line);
});

rd.on('close', () => {
    const exit = mockup.length > 0 ? 0 : 1;
});