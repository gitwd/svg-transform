#! /usr/bin/env node
const path = require('path');
const program = require('commander');
const utils = require('../lib/utils')

const {
  symbolsGenerator,
  iconfontGenerator,
} = require('../lib/generator');

program
  .version('1.0.0');
  
program
  .usage('[options]')
  .description('select the type of output files')
  .option('-s, --symbols', 'transform svg to svg symbols')
  .option('-i, --iconfont', 'transform svg to iconfonts')

program.unknownOption = function () {
   console.error('Invalid option: %s\nSee --help for a list of available options.', program.args.join(' '));
   process.exit(1);
};
program.parse(process.argv);

const {
  symbols,
  iconfont,
} = program;
const config = utils.getConfig(path.resolve('./.svgrc.js'));
if (symbols) {
  symbolsGenerator(config);
} else if (iconfont) {
  iconfontGenerator(config);
} else {
  symbolsGenerator(config);
  iconfontGenerator(config);
}