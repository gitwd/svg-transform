#! /usr/bin/env node
const path = require('path');
const program = require('commander');
const utils = require('../lib/utils');

const {
  symbolsGenerator,
  iconfontGenerator,
} = require('../lib/generator');

program
  .version('1.0.0');
program
  .usage('[options]')
  .option('-t, --type <type>', 'Specify the file type you want', /^(symbols|iconfont|all)$/i, 'all')
  .option('-c, --configFile [config]', 'config file', './.svgrc.js')

program.unknownOption = function () {
   console.error('Invalid option: %s\nSee --help for a list of available options.', program.args.join(' '));
   process.exit(1);
};
program.parse(process.argv);

const {
  type,
  configFile,
} = program;

const config = utils.getConfig(path.resolve(configFile));
if (type === 'symbols') {
  symbolsGenerator(config);
} else if (type === 'iconfont') {
  iconfontGenerator(config);
} else {
  symbolsGenerator(config);
  iconfontGenerator(config);
}