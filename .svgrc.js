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