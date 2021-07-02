const fs = require('fs');
const md5 = require('md5');

const assets = [
  'css/styles.css',
  'js/scripts.js'
];

const dataFile = '_data/hash.json';

let jsonValue = {};

assets.forEach((asset) => {
  let file = '_site/' + asset;
  let fileHash = md5(fs.readFileSync(file)).substring(0, 15);

  let assetNameArray = asset.split('.');
  assetNameArray.splice(assetNameArray.length - 1, 0, fileHash);
  let hashedAsset = assetNameArray.join('.');

  
  fs.copyFile(file, '_site/' + hashedAsset, function (err) {
    if (err) throw err
  });

  jsonValue[asset] = hashedAsset;
});
fs.writeFileSync(dataFile, JSON.stringify(jsonValue));