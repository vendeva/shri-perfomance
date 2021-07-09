const { FileListPlugin } = require("./file-list-plugin.js");
module.exports = function override(config, env) {
    config.plugins.push(new FileListPlugin());
    return config;
};
