const { Router } = require("express");

const settings = require("./controllers/settings");
const builds = require("./controllers/builds");
const metrics = require("./controllers/metrics");

// routes for /api/settings

const apiSettings = new Router();

apiSettings.get("/", settings.getSettings);
apiSettings.post("/", settings.addSettings);

exports.apiSettings = apiSettings;

// routes for /api/builds

const apiBuilds = new Router();

apiBuilds.get("/", builds.getBuilds);
apiBuilds.post("/:commitHash", builds.addBuild);
apiBuilds.get("/:buildId", builds.getBuild);
apiBuilds.get("/:buildId/logs", builds.getBuildLog);

exports.apiBuilds = apiBuilds;

// routes for /api/metrics

const apiMetrics = new Router();

apiMetrics.get("/", metrics);

exports.apiMetrics = apiMetrics;
