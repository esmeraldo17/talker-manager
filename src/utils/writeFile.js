const fs = require('fs/promises');

const writeFile = async (data) => {
   await fs.writeFile('src/talker.json', JSON.stringify(data, null, 2));
};

module.exports = writeFile;