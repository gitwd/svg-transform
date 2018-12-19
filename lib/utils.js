const fs = require('fs');
const colors = require('colors')

exports.getConfig = (filePath) => {
  try {
    const {
      config
    } = require(filePath);
    if (config) {
      return config;
    } else {
      console.error(colors.red(`read config ${filePath} fail`));
      return false;
    }
  } catch (err) {
    console.error(colors.red(`read config ${filePath} fail`));
    return false;
  }
}