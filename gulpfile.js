const path = require('path')
const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const utils = require('./lib/utils')

const plugins = gulpLoadPlugins();
const config = utils.getConfig(path.resolve('./.svgrc.js'));

/**
 * svg图标生成svg symbols
 */
gulp.task('symbols:gen', () => {
  const {
    src,
    docDir,
    symbols: {
      name,
      destPath,
      demoFile,
    }
  } = config;

  let globs = path.join(src, '**/*.svg');
  let tmpl = path.resolve(__dirname, './templates/svg-symbols.html');

  const filter = {
    svg: plugins.filter(file => /\.svg$/.test(file.path), {
      restore: true
    }),
    html: plugins.filter(file => /\.html$/.test(file.path), {
      restore: true
    })
  };

  const distDir = path.posix.join(docDir, destPath);

  return gulp.src(globs)
    .pipe(plugins.cheerio({
      run($) {
        $('style').remove();
        $('[class]').removeAttr('class');
        $('[id]').removeAttr('id');
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(plugins.svgSymbols({
      templates: ['default-svg', tmpl],
      transformData(svg, defaultData) {
        return {
          id: defaultData.id,
          className: defaultData.className,
          width: '48px',
          height: '48px',
          filePath: path.posix.join('/', destPath, name),
        };
      }
    }))
    .pipe(filter.svg)
    .pipe(plugins.rename(name))
    .pipe(gulp.dest(distDir))
    .pipe(filter.svg.restore)
    .pipe(filter.html)
    .pipe(plugins.rename(demoFile))
    .pipe(gulp.dest(distDir));
});

/**
 * svg图标生成iconfont
 */
gulp.task('iconfont:gen', () => {
  const {
    src,
    docDir,
    iconfont: {
      name,
      styleName,
      formats,
      destPath,
      demoFile,
    }
  } = config;

  let globs = path.join(src, '**/*.svg');
  const distDir = path.posix.join(docDir, destPath);
  let tmpl = {
    css: path.resolve(__dirname, './templates/iconfont.css'),
    html: path.resolve(__dirname, './templates/iconfont.html')
  };

  return gulp.src(globs)
    .pipe(plugins.iconfont({
      fontName: name,
      formats,
      timestamp: Math.round(Date.now() / 1000)
    }))
    .on('glyphs', (glyphs) => {
      let data = {
        className: 'icon',
        fontName: name,
        glyphs
      };

      // 文档参数
      let docData = {
        ...data,
        fontPath: ''
      };

      // 生成iconfont文档所需的css
      gulp.src(tmpl.css)
        .pipe(plugins.consolidate('lodash', docData))
        .pipe(plugins.rename(styleName))
        .pipe(gulp.dest(distDir));

      // 生成iconfont文档页面
      gulp.src(tmpl.html)
        .pipe(plugins.consolidate('lodash', docData))
        .pipe(plugins.rename(demoFile))
        .pipe(gulp.dest(distDir));
    })
    .pipe(gulp.dest(distDir));
});
