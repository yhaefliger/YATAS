const fs = require('fs');
const md5 = require('md5');

const assets = [
  '/css/styles.css',
  '/js/scripts.js'
];

const dataFile = '_data/hash.json';

const production = process.env.NODE_ENV === 'development' ? false:true;

let jsonValue = {};

assets.forEach((asset) => {
  if (production) {
    let file = '_site/' + asset;
    let fileHash = md5(fs.readFileSync(file)).substring(0, 15);
  
    let assetNameArray = asset.split('.');
    assetNameArray.splice(assetNameArray.length - 1, 0, fileHash);
    let hashedAsset = assetNameArray.join('.');
  
    
    fs.renameSync(file, '_site/' + hashedAsset);
    jsonValue[asset] = hashedAsset;
  } else {
    jsonValue[asset] = asset;
  }

});

fs.writeFileSync(dataFile, JSON.stringify(jsonValue));