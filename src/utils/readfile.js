const fs = require('fs/promises');

const readFile = async () => {
    const data = await fs.readFile('src/talker.json');
    return JSON.parse(data);
  };

module.exports = readFile;