const { instance } = require("../../config");

// получение сохраненных настроек
module.exports = async (req, res) => {
    try {
        const { data } = await instance.get("/conf");
        res.json(data);
    } catch (e) {
        res.end(e.message);
    }
};
