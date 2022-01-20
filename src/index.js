const child_process = require('child_process');

class GitVersionWebpackPlugin {
  constructor(options) {
    console.log('GitVersionWebpackPlugin', options);
  }

  apply(compiler) {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log(compiler);
    const HtmlWebpackPlugin = compiler.options.plugins
      .map(({ constructor }) => constructor)
      .find(
        constructor => constructor && constructor.name === 'HtmlWebpackPlugin'
      );

    const version = child_process.execSync('git branch --v', {
      encoding: 'utf8'
    });

    compiler.hooks.compilation.tap('GitVersionWebpackPlugin', compilation => {
      console.log('The compiler is starting a new compilation...');
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'GitVersionWebpackPlugin', 
        (data, cb) => {
          // Manipulate the content
          data.html += `<script>console.log('current version: ${
            version.split(' ')[1]
          }')</script>`;
          // Tell webpack to move on
          cb(null, data);
        }
      );
    });
  }
}

module.exports = GitVersionWebpackPlugin;
