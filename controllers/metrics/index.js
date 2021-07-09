const constants = require("../../client/src/constants/constants");
const axios = require("axios");

const {
    prepareData,
    showSession,
    calcMetricByDate,
    showMetricByPeriod,
    compareMetric,
} = require("./helpers.js");

//получение метрики
module.exports = async (req, res) => {
    try {
        const axiosData = await axios.get(
            `https://shri.yandex/hw/stat/data?counterId=${constants.GUID}`
        );

        let data = prepareData(axiosData.data);

        showSession(data, "main", "553619148036");
        calcMetricByDate(data, "main", "fcp", "2021-07-09");
        showMetricByPeriod(data, "main", "fcp", "2021-07-08", "2021-07-09");
        compareMetric(data, "main", "fcp", "browser");
        compareMetric(data, "main", "fcp", "platform");

        res.end("see the data on metrics in the terminal");
    } catch (e) {
        res.status(500).end(e.message);
    }
};
