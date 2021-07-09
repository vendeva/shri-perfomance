const { instance } = require("../../config");

//получение информации о конкретной сборке
module.exports = async (req, res) => {
    const { buildId } = req.params;
    try {
        const { data } = await instance.get("/build/details", { params: { buildId } });
        res.json(data);
    } catch (e) {
        res.end(e.message);
    }
};
