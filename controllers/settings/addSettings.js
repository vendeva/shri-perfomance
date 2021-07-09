const { instance, useLocalPath, execPromise } = require("../../config");

//установка настроек репозитория
module.exports = async (req, res) => {
    const { repoName, buildCommand, mainBranch, period } = req.body;

    try {
        await execPromise("rm", ["-rf", "localRepository/"]);
        await execPromise("git", ["clone", repoName, "localRepository"]);
        await instance.post("/conf", {
            repoName,
            buildCommand,
            mainBranch,
            period,
        });
        res.json(req.body);
    } catch (e) {
        console.log(e.message);
        res.status(500).end(e.message);
    }
};
