const { promisify } = require("util");
const { resolve } = require("path");
const fs = require("fs");
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

class FileListPlugin {
    static defaultOptions = {
        outputFile: "unused.json",
    };

    constructor(options = {}) {
        this.options = { ...FileListPlugin.defaultOptions, ...options };
        this.arrUsedModules = [];
        this.arrAllModules = [];
        this.ignore = /\.gitignore|\.idea|node_modules|build/;
    }

    async getFiles(dir) {
        const subdirs = await readdir(dir);
        const files = await Promise.all(
            subdirs.map(async (subdir) => {
                const res = resolve(dir, subdir);
                return (await stat(res)).isDirectory() ? this.getFiles(res) : res;
            })
        );
        files.forEach((f) => {
            if (f && !this.ignore.test(f) && !this.arrAllModules.includes(f)) {
                this.arrAllModules.push(f);
            }
        });
    }

    apply(compiler) {
        compiler.hooks.entryOption.tap("FileListPlugin", (context) => {
            this.projectDirectory = context;
        });

        compiler.hooks.normalModuleFactory.tap("FileListPlugin", (normalModuleFactory) => {
            normalModuleFactory.hooks.module.tap("FileListPlugin", (_, createData) => {
                const { resource } = createData;
                if (!/node_modules/.test(resource) && !this.arrUsedModules.includes(resource)) {
                    this.arrUsedModules.push(createData.resource);
                }
            });
        });

        compiler.hooks.emit.tapAsync("FileListPlugin", async (_, callback) => {
            await this.getFiles(this.projectDirectory);
            const unusedFiles = this.arrAllModules
                .filter((el) => !this.arrUsedModules.includes(el))
                .map((item) => item.replace(this.projectDirectory, ""));

            fs.writeFile(this.options.outputFile, JSON.stringify(unusedFiles), function (error) {
                if (error) throw error;
                const content =
                    "# Unused files in project:\n\n" +
                    unusedFiles.map((filename) => `- ${filename}`).join("\n");
                console.log(content);
            });
            callback();
        });
    }
}

module.exports = { FileListPlugin };
