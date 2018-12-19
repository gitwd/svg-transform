# svg2others
transform svg to svg symbols or iconfont
## 功能
- 将svg文件批量转换为svg symbols或iconfont
## 使用
### 全局安装
- npm i svg2others -g

### Options:
```
  -V, --version       output the version number
  -t, --type          Specify the file type you want (symbols/iconfont/all) (default: "all")
  -c, --configFile    config file (default: "./.svgrc.js")
  -h, --help          output usage information  
```
### 配置文件
需要在自己项目目录下创建.svgrc.js文件，用来配置文件输出路径等信息，可用配置如下。
```
exports.config = {
  /**
   * 原文件目录
   */
  src: './example/icons',
  /**
   * 输出路径
   */
  docDir: './example/docs',

  /**
   * SVG Symbols配置项
   * @type {Object}
   */
  symbols: {
    /**
     * 指定生成的SVG Symbols输出位置
     * @type {String}
     */
    destPath: 'svg-symbols',
    /**
     * 输出文件名
     * @type {String}
     */
    name: 'icon-symbols.svg',
    // /**
    //  * 文档名
    //  * @type {String}
    //  */
    demoFile: 'demo.html'
  },
  /**
   * iconfont配置项
   * @type {Object}
   */
  iconfont: {
    /**
     * 指定iconfont输出位置
     * @type {String}
     */
    destPath: 'iconfont',
    /**
     * iconfont输出文件名
     * @type {String}
     */
    name: 'iconfont',
    styleName: 'iconfont.css',
    formats: ['svg', 'ttf', 'eot', 'woff'],
    /**
     * 文档名
     * @type {String}
     */
    demoFile: 'demo.html'
  }
}
```
## 例子
```shell
$ svg2icon symbols // 根据配置文件生成svg symbols
$ svg2icon iconfont // 根据配置文件导出iconfont
$ svg2icon // 根据配置文件导出svg symbols和iconfont
```